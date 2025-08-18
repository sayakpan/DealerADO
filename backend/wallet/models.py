from django.db import models, transaction
from django.contrib.auth.models import User
from django.conf import settings


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    # currency = models.CharField(max_length=10, default='INR')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name}'s Wallet"

    def add_balance(self, amount):
        with transaction.atomic():
            self.balance += amount
            self.save()

    def deduct_balance(self, amount):
        if self.balance < amount:
            raise ValueError("Insufficient balance")
        with transaction.atomic():
            self.balance -= amount
            self.save()
            

class TransactionLog(models.Model):
    TRANSACTION_TYPES = [
        ('recharge', 'Recharge'),
        ('debit', 'Debit'),
        ('expired', 'Expired'),
        ('reversal', 'Reversal'),
    ]

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    service_name = models.CharField(max_length=100, blank=True)
    previous_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    new_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    amount_change = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    note = models.TextField(blank=True, help_text="Optional note or reason for this transaction.")
    timestamp = models.DateTimeField(auto_now_add=True)
    related_transaction = models.ForeignKey(
        'self', null=True, blank=True,
        on_delete=models.SET_NULL,
        help_text="Reference to the original transaction (if reversed)"
    )
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='wallet_actions',
        help_text='User who performed this transaction (e.g. admin)'
    )

    def __str__(self):
        return f"{self.wallet.user.first_name}'s Wallet:  ₹{self.amount_change} ({self.transaction_type.title()})"
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = "Transaction Log"
        verbose_name_plural = "Transaction Logs"