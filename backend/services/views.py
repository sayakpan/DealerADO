import stat
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponse
from services.utils import build_absolute_pdf_url, generate_service_pdf
from .models import ServiceCategory, Service
from .serializers import ServiceCategoryDetailSerializer, ServiceCategorySerializer, ServiceDetailSerializer, ServiceUsageLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from services.models import Service, ServiceUsageLog
from wallet.models import Wallet, TransactionLog
from django.db import transaction
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.timezone import now
import time
import requests
import json

User = get_user_model()


class ServiceCategoryListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    
    serializer_class = ServiceCategorySerializer
    queryset = ServiceCategory.objects.all().order_by('rank', 'name')
    
    

class ServiceCategoryDetailAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    
    queryset = ServiceCategory.objects.prefetch_related('services')
    serializer_class = ServiceCategoryDetailSerializer
    lookup_field = 'slug'
    
    

class ServiceDetailAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    
    queryset = Service.objects.filter(is_active=True).prefetch_related('form_fields')
    serializer_class = ServiceDetailSerializer
    lookup_field = 'slug'
    
    
    
class UserServiceUsageLogListView(ListAPIView):
    serializer_class = ServiceUsageLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ServiceUsageLog.objects.filter(user=self.request.user).order_by('-created_at')    
    
    
    
# Function Based Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_service_form(request, slug):
    user = request.user
    if not user or isinstance(user, AnonymousUser) or not user.is_authenticated:
        return JsonResponse({"error": "You are not authorized to access this resource."}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        service = Service.objects.get(slug=slug, is_active=True)
    except Service.DoesNotExist:
        raise Http404("Service not found.")
    
    # Step 1: Wallet check
    try:
        wallet = user.wallet
    except Wallet.DoesNotExist:
        return JsonResponse({
            "success": False,
            "message": "Wallet not found",
            "service": service.name,
            "log_id": None,
            "response": {}
        }, status=status.HTTP_403_FORBIDDEN)

    if wallet.balance < service.price_per_hit:
        return JsonResponse({
            "success": False,
            "message": "Insufficient wallet balance",
            "service": service.name,
            "log_id": None,
            "response": {
                "balance": float(wallet.balance),
                "required": float(service.price_per_hit)
            }
        }, status=status.HTTP_402_PAYMENT_REQUIRED)

    # Step 2: Validate payload
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({
            "success": False,
            "message": "Invalid JSON",
            "service": service.name,
            "log_id": None,
            "response": {}
        }, status=status.HTTP_400_BAD_REQUEST)

    expected_keys = list(service.form_fields.values_list('key', flat=True))
    missing_keys = [key for key in expected_keys if key not in data]
    if missing_keys:
        return JsonResponse({
            "success": False,
            "message": "Missing required fields.",
            "service": service.name,
            "log_id": None,
            "response": {"missing": missing_keys}
        }, status=status.HTTP_400_BAD_REQUEST)
        
    sanitized_data = {
        k: str(v).strip() if isinstance(v, str) else v
        for k, v in data.items()
        if k in expected_keys
    }

    # Step 3: Prepare headers
    headers = {'Content-Type': 'application/json'}
    if service.secret:
        if service.secret.auth_type == 'bearer_token':
            headers['Authorization'] = f"Bearer {service.secret.bearer_token}"
        elif service.secret.auth_type == 'custom_headers':
            custom_headers = service.secret.headers or {}
            headers.update({
                k: v for k, v in custom_headers.items()
                if isinstance(k, str) and isinstance(v, str)
            })
        
    # Step 4: Call external API 
    response = None
    full_url = service.api_url
    try:
        if service.api_method.upper() == 'GET':
            full_url = requests.Request('GET', service.api_url, params=sanitized_data).prepare().url
            response = requests.get(full_url, headers=headers, timeout=15)
        else:
            full_url = service.api_url
            response = requests.post(full_url, json=sanitized_data, headers=headers, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        http_status = getattr(e.response, 'status_code', 500) if hasattr(e, 'response') and e.response else 500
        
        ServiceUsageLog.objects.create(
            user=user,
            service=service,
            full_url=full_url,
            form_data_sent=sanitized_data,
            api_response={"error": str(e)},
            http_status_code=http_status,
            status='failed',
            price_at_time=service.price_per_hit
        )
        return JsonResponse({
            "success": False,
            "message": "External API call failed.",
            "service": service.name,
            "log_id": None,
            "response": {"error": str(e)}
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
    try:
        response_json = response.json()
    except ValueError:
        response_json = {"raw_response": response.text}
        
    deductible_codes = set(service.deductible_codes.values_list("code", flat=True))
    if not deductible_codes:
        return JsonResponse({
            "success": False,
            "message": "No deductible codes configured for this service.",
            "service": service.name,
            "log_id": None,
            "response": {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    should_deduct = response.status_code in deductible_codes
    external_success = should_deduct or response_json.get("status") == "success"
    
    usage_log = ServiceUsageLog.objects.create(
        user=user,
        service=service,
        full_url=full_url,
        form_data_sent=data,
        api_response=response_json,
        status='success' if external_success else 'failed',
        http_status_code=response.status_code,
        response_time_ms=int(response.elapsed.total_seconds() * 1000),
        price_at_time=service.price_per_hit
    )
    
    if should_deduct:
        try:
            with transaction.atomic():
                previous = wallet.balance
                wallet.deduct_balance(service.price_per_hit)
                transaction_log = TransactionLog.objects.create(
                    wallet=wallet,
                    transaction_type='debit',
                    service_name=service.name,
                    previous_balance=previous,
                    new_balance=wallet.balance,
                    amount_change=service.price_per_hit,
                    note=f"Service API hit for '{service.name}'",
                    performed_by=user
                )
                usage_log.wallet_transaction = transaction_log
                usage_log.save()
        except ValueError:
            return JsonResponse({
                "success": False,
                "message": "Wallet deduction failed after API call. Please contact support.",
                "service": service.name,
                "log_id": usage_log.id,
                "response": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Step 7: Return final result
    if not external_success:
        return JsonResponse({
            "success": False,
            "message": "External API responded with failure. No wallet deduction made.",
            "service": service.name,
            "log_id": usage_log.id,
            "response": response_json
        }, status=status.HTTP_400_BAD_REQUEST)
        
    return JsonResponse({
        "success": True,
        "message": "Success",
        "service": service.name,
        "log_id": usage_log.id,
        "response": response_json
    })
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def generate_pdf_from_log(request):
    log_id = request.GET.get("log_id")
    if not log_id:
        return JsonResponse({"error": "log_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usage_log = ServiceUsageLog.objects.get(id=log_id, user=request.user)
    except ServiceUsageLog.DoesNotExist:
        return JsonResponse({"error": "Service usage log not found"}, status=status.HTTP_404_NOT_FOUND)

    if usage_log.status != "success":
        return JsonResponse({"error": "Cannot generate PDF for failed log."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        pdf_buffer = generate_service_pdf(
            usage_log.service.name,
            usage_log.api_response,
            usage_log.user
        )
        timestamp = int(time.time())
        pdf_filename = f"service_reports/{usage_log.service.slug}_{usage_log.user.id}_{timestamp}.pdf"
        pdf_file = ContentFile(pdf_buffer.getvalue())
        default_storage.save(pdf_filename, pdf_file)
        pdf_url = build_absolute_pdf_url(pdf_filename)

        return JsonResponse({
            "message": "PDF generated successfully.",
            "pdf_url": pdf_url,
            "pdf_filename": pdf_filename
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_service_pdf(request):
    filename = request.data.get("filename")
    if not filename:
        return JsonResponse({"error": "Filename is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if default_storage.exists(filename):
            default_storage.delete(filename)
            return JsonResponse({"message": "PDF deleted successfully."})
        else:
            return JsonResponse({"error": "File does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
