from django.contrib import admin
from .models import Wallet, TransactionLog


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('id', 'wallet_holder_name', 'balance', 'currency', 'is_active', 'updated_at')
    readonly_fields = ('user', 'updated_at','currency')
    
    def wallet_holder_name(self, obj):
        return obj.user.first_name or "(No Name)"

    def save_model(self, request, obj, form, change):
        if change:
            old_obj = Wallet.objects.get(pk=obj.pk)
            old_balance = old_obj.balance
            new_balance = form.cleaned_data['balance']

            delta = new_balance - old_balance

            if delta != 0:
                TransactionLog.objects.create(
                    wallet=obj,
                    transaction_type='recharge' if delta > 0 else 'expired',
                    service_name='Manual Admin Adjustment',
                    amount_change=delta,
                    previous_balance=old_balance,
                    new_balance=new_balance,
                    performed_by=request.user,
                    note='Manual balance update via admin.'
                )

        super().save_model(request, obj, form, change)
        
        
@admin.register(TransactionLog)
class TransactionLogAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'transaction_type', 'amount_change', 'service_name', 'performed_by', 'timestamp')
    list_filter = ('transaction_type', 'timestamp')
    search_fields = ('wallet__user__username', 'wallet__user__email', 'service_name', 'note')
    readonly_fields = ('timestamp','wallet', 'transaction_type', 'amount_change', 'previous_balance', 'new_balance', 'related_transaction', 'performed_by')