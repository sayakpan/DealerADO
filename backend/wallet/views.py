# wallet/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Wallet, TransactionLog
from .serializers import TransactionLogSerializer
from .pagination import WalletHistoryPagination

class WalletSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        wallet, _ = Wallet.objects.get_or_create(user=user)
        transactions = TransactionLog.objects.filter(wallet=wallet).order_by("-timestamp")
        paginator = WalletHistoryPagination()
        page = paginator.paginate_queryset(transactions, request)
        history_serialized = TransactionLogSerializer(page, many=True).data

        return Response({
            "balance": {
                "amount": round(wallet.balance, 2),
            },
            "history": paginator.get_paginated_response(history_serialized).data
        })