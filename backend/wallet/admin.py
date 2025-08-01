from django.contrib import admin
from .models import Wallet, TransactionLog
from import_export import resources
from import_export.admin import ExportMixin
from import_export.formats.base_formats import CSV, XLSX
from rangefilter.filters import DateTimeRangeFilter
from django.urls import path
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django import forms
from decimal import Decimal
from django.urls import reverse


# @admin.register(Wallet)
# class WalletAdmin(admin.ModelAdmin):
#     list_display = ('id', 'wallet_holder_name', 'balance', 'currency', 'is_active', 'updated_at')
#     readonly_fields = ('user', 'updated_at','currency')
    
#     def wallet_holder_name(self, obj):
#         return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"

#     def save_model(self, request, obj, form, change):
#         if change:
#             old_obj = Wallet.objects.get(pk=obj.pk)
#             old_balance = old_obj.balance
#             new_balance = form.cleaned_data['balance']

#             delta = new_balance - old_balance

#             if delta != 0:
#                 TransactionLog.objects.create(
#                     wallet=obj,
#                     transaction_type='recharge' if delta > 0 else 'expired',
#                     service_name='Manual Admin Adjustment',
#                     amount_change=delta,
#                     previous_balance=old_balance,
#                     new_balance=new_balance,
#                     performed_by=request.user,
#                     note='Manual balance update via admin.'
#                 )

#         super().save_model(request, obj, form, change)
        

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
        return True if obj else False
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return [f.name for f in self.model._meta.fields if f.name != 'note']
        return super().get_readonly_fields(request, obj)
    
    
class WalletTransactionForm(forms.Form):
    TRANSACTION_TYPE_CHOICES = [
        ('recharge', 'Recharge'),
        ('debit', 'Deduct')
    ]
    transaction_type = forms.ChoiceField(choices=TRANSACTION_TYPE_CHOICES)
    amount = forms.DecimalField(decimal_places=2, max_digits=10, min_value=0.01)
    service_name = forms.CharField(max_length=100)
    note = forms.CharField(widget=forms.Textarea, required=False)
    

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('id', 'wallet_holder_name', 'balance', 'currency', 'is_active', 'updated_at')
    readonly_fields = ('user', 'updated_at', 'currency')

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<int:wallet_id>/transaction/',
                self.admin_site.admin_view(self.process_transaction),
                name='wallet_process_transaction',
            ),
        ]
        return custom_urls + urls

    def change_view(self, request, object_id, form_url='', extra_context=None):
        if extra_context is None:
            extra_context = {}

        transaction_url = reverse('admin:wallet_process_transaction', args=[object_id])
        extra_context['custom_transaction_url'] = transaction_url

        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    def process_transaction(self, request, wallet_id):
        wallet = get_object_or_404(Wallet, id=wallet_id)

        if request.method == 'POST':
            form = WalletTransactionForm(request.POST)
        else:
            tx_type_initial = request.GET.get('type', 'recharge')
            form = WalletTransactionForm(initial={'transaction_type': tx_type_initial})

        if request.method == 'POST' and form.is_valid():
            amount = form.cleaned_data['amount']
            tx_type = form.cleaned_data['transaction_type']
            note = form.cleaned_data['note']
            service_name = form.cleaned_data['service_name']
            old_balance = wallet.balance

            try:
                if tx_type == 'recharge':
                    wallet.add_balance(amount)
                    tx_code = 'recharge'
                else:
                    wallet.deduct_balance(amount)
                    tx_code = 'debit'
            except ValueError as e:
                messages.error(request, str(e))
                return redirect(request.path)

            TransactionLog.objects.create(
                wallet=wallet,
                transaction_type=tx_code,
                service_name=service_name,
                amount_change=amount if tx_code == 'recharge' else -amount,
                previous_balance=old_balance,
                new_balance=wallet.balance,
                note=note,
                performed_by=request.user
            )

            messages.success(request, f"{tx_type.title()} of ₹{amount} successful.")
            return redirect(reverse('admin:wallet_wallet_change', args=[wallet_id]))

        return render(request, 'admin/wallet/wallet_transaction_form.html', {
            'form': form,
            'wallet': wallet
        })

    def wallet_holder_name(self, obj):
        return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"