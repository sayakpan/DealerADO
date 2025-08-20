# wallet/serializers.py

from rest_framework import serializers
from .models import TransactionLog, Wallet

class TransactionLogSerializer(serializers.ModelSerializer):
    performed_by = serializers.SerializerMethodField()

    class Meta:
        model = TransactionLog
        fields = [
            "id", "transaction_type", "amount_change", "previous_balance",
            "new_balance", "service_name", "performed_by", "timestamp"
        ]

    def get_performed_by(self, obj):
        return "admin" if obj.performed_by and obj.performed_by.is_staff else "user"
    
    
class WalletBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["balance"]