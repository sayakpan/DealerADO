from django.contrib import admin
from .models import Wallet, TransactionLog
from import_export import resources
from import_export.admin import ExportMixin
from import_export.formats.base_formats import CSV, XLSX
from rangefilter.filters import DateTimeRangeFilter


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('id', 'wallet_holder_name', 'balance', 'currency', 'is_active', 'updated_at')
    readonly_fields = ('user', 'updated_at','currency')
    
    def wallet_holder_name(self, obj):
        return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"

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
        

class TransactionLogResource(resources.ModelResource):
    class Meta:
        model = TransactionLog
        fields = (
            'id',
            'wallet__user__username',
            'transaction_type',
            'amount_change',
            'previous_balance',
            'new_balance',
            'service_name',
            'note',
            'performed_by__username',
            'timestamp',
        )
        export_order = fields
        
@admin.register(TransactionLog)
class TransactionLogAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = TransactionLogResource
    formats = [CSV, XLSX]
    list_display = ('wallet', 'transaction_type', 'amount_change', 'service_name', 'performed_by', 'timestamp')
    list_filter = ('transaction_type', ('timestamp', DateTimeRangeFilter))
    search_fields = ('wallet__user__username', 'wallet__user__email', 'service_name', 'note')
    readonly_fields = ('timestamp','wallet', 'transaction_type', 'amount_change', 'previous_balance', 'new_balance', 'related_transaction', 'performed_by')
    
    def has_add_permission(self, request):
        return False  # disallow adding logs manually

    def has_change_permission(self, request, obj=None):
        return False