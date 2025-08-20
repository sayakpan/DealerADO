# wallet/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Wallet, TransactionLog
from .serializers import TransactionLogSerializer, WalletBalanceSerializer
from .pagination import WalletHistoryPagination

class WalletSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        wallet, _ = Wallet.objects.get_or_create(user=user)
        
        # ✅ get query params
        transaction_type = request.query_params.get("transaction_type")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        service_name = request.query_params.get("service_name")
        ordering = request.query_params.get("ordering", "-timestamp") 
    
        transactions = TransactionLog.objects.filter(wallet=wallet).order_by("-timestamp")
        
        if transaction_type:
            transactions = transactions.filter(transaction_type=transaction_type)
        if service_name:
            transactions = transactions.filter(service_name__icontains=service_name)
        if start_date:
            transactions = transactions.filter(timestamp__date__gte=start_date)
        if end_date:
            transactions = transactions.filter(timestamp__date__lte=end_date)
            
        if ordering in ["timestamp", "-timestamp", "amount_change", "-amount_change"]:
            transactions = transactions.order_by(ordering)
        
        paginator = WalletHistoryPagination()
        page = paginator.paginate_queryset(transactions, request)
        history_serialized = TransactionLogSerializer(page, many=True).data

        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
            },
            "balance": {
                "amount": round(wallet.balance, 2),
            },
            "history": paginator.get_paginated_response(history_serialized).data
        })
        
        
class WalletBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        serializer = WalletBalanceSerializer(wallet)
        return Response(serializer.data, status=status.HTTP_200_OK)