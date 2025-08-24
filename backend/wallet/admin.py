from django.contrib import admin
from .models import Wallet, TransactionLog
from import_export import resources
from import_export.admin import ExportMixin
from import_export.formats.base_formats import CSV, XLSX
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django import forms
from django.urls import reverse
from unfold.admin import ModelAdmin
from unfold.decorators import display
from unfold.decorators import action as unfold_action
from unfold.widgets import UnfoldAdminTextInputWidget, UnfoldAdminTextareaWidget, UnfoldAdminDecimalFieldWidget
from unfold.contrib.import_export.forms import ExportForm
from import_export.admin import ExportMixin
from unfold.contrib.filters.admin import RangeDateTimeFilter
from django.utils.translation import gettext_lazy as _



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
class TransactionLogAdmin(ExportMixin, ModelAdmin):
    resource_class = TransactionLogResource
    export_form_class = ExportForm
    formats = [CSV, XLSX]
    actions = ["export"] 
    list_filter_submit = True
    compressed_fields = True
    
    list_display = ('id', 'wallet', 'transaction_type_badge', 'amount_change', 'service_name', 'performed_by', 'timestamp')
    list_filter = ('transaction_type', ('timestamp', RangeDateTimeFilter))
    search_fields = ('wallet__user__username', 'wallet__user__email', 'service_name', 'note')
    readonly_fields = ('timestamp','wallet', 'transaction_type', 'amount_change', 'previous_balance', 'new_balance', 'related_transaction', 'performed_by', 'is_reversed')
    fields = ('id', 'wallet', 'transaction_type', 'service_name', 'amount_change', 'previous_balance', 'new_balance', 'related_transaction', 'performed_by', 'timestamp', 'note',)


    def has_add_permission(self, request):
        return False  # disallow adding logs manually

    def has_change_permission(self, request, obj=None):
        return True if obj else False
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return [f.name for f in self.model._meta.fields if f.name != 'note']
        return super().get_readonly_fields(request, obj)
    
    def refund_transaction(self, request, queryset):
        transactions_to_reverse = []
        wallets_to_update = set()
        transactions_processed = 0  # Track how many transactions are actually reversed

        for transaction in queryset:
            if transaction.is_reversed:
                messages.error(request, f"Transaction {transaction.id} has already been reversed.")
                continue  # Skip if already reversed

            # Check if the transaction is valid for reversal
            wallet = transaction.wallet
            if transaction.transaction_type == 'debit':
                new_balance = wallet.balance + transaction.amount_change
            else:
                new_balance = wallet.balance - transaction.amount_change

            # Create the reversal transaction object
            new_tx = TransactionLog(
                wallet=wallet,
                transaction_type='reversal',
                service_name=transaction.service_name,
                amount_change=-transaction.amount_change if transaction.transaction_type == 'recharge' else transaction.amount_change,
                previous_balance=wallet.balance,
                new_balance=new_balance,
                note=f"Reversal of transaction {transaction.id}: {transaction.note}",
                related_transaction=transaction,  # Link to the original transaction
                performed_by=request.user
            )

            # Add to lists for bulk create and update
            transactions_to_reverse.append(new_tx)
            wallets_to_update.add(wallet)

            # Mark the original transaction as reversed
            transaction.is_reversed = True
            transaction.save()

            transactions_processed += 1  # Increment count of processed transactions

        # Perform bulk creation of reversal transactions
        if transactions_to_reverse:
            TransactionLog.objects.bulk_create(transactions_to_reverse)

        # Bulk update wallet balances
        if wallets_to_update:
            Wallet.objects.bulk_update(wallets_to_update, ['balance'])

        # Return appropriate message based on transactions processed
        if transactions_processed > 0:
            messages.success(request, f"{transactions_processed} reversal transactions processed successfully.")
        else:
            messages.info(request, "No transactions were reversed because they were either already reversed or invalid.")
            
    refund_transaction.short_description = "Reverse Selected Transactions"
    actions = [refund_transaction]

    @display(
        description="Transaction Type",
        ordering="transaction_type",
        label={
            "recharge": "success",
            "debit": "danger",
            "reversal": "info",
        },
    )
    def transaction_type_badge(self, obj):
        return obj.transaction_type
    
    
class WalletTransactionForm(forms.Form):
    amount = forms.DecimalField(
        decimal_places=2,
        max_digits=10,
        min_value=0.01,
        widget=UnfoldAdminDecimalFieldWidget
    )
    service_name = forms.CharField(
        label="Service Name / Reason",
        widget=UnfoldAdminTextInputWidget,
        help_text="e.g., Recharge"
    )
    note = forms.CharField(
        widget=UnfoldAdminTextareaWidget,
        required=False
    )


@admin.register(Wallet)
class WalletAdmin(ModelAdmin):
    compressed_fields = True
    search_fields = ["user__username", "user__email"]
    list_display = ('id', 'wallet_holder_name', 'balance', 'updated_at')
    readonly_fields = ('user', 'balance', 'updated_at')
    fields = ('user', 'balance', 'updated_at')

    actions_detail = ["recharge_wallet", "deduct_from_wallet"]
    
    # -- Recharge Action --
    @unfold_action(
        description="Recharge", 
        url_path="recharge",
        attrs={"class": "btn-success"}
    )
    def recharge_wallet(self, request, object_id):
        return self.handle_transaction(request, object_id, 'recharge')

    # -- Deduct Action --
    @unfold_action(
        description="Deduct",
        url_path="deduct",
        attrs={"class": "btn-danger"}
    )
    def deduct_from_wallet(self, request, object_id):
        return self.handle_transaction(request, object_id, 'debit')

    def handle_transaction(self, request, wallet_id, tx_type):
        wallet = get_object_or_404(Wallet, id=wallet_id)

        if request.method == 'POST':
            form = WalletTransactionForm(request.POST)
        else:
            tx_type_initial = request.resolver_match.url_name 
            tx_type = 'recharge' if tx_type_initial == 'wallet_wallet_recharge_wallet' else 'debit'
            form = WalletTransactionForm(initial={'transaction_type': tx_type})

        if request.method == 'POST' and form.is_valid():
            tx_type_initial = request.resolver_match.url_name
            tx_type = 'recharge' if tx_type_initial == 'wallet_wallet_recharge_wallet' else 'debit'
            
            amount = form.cleaned_data['amount']
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

        context = {
            'form': form,
            'wallet': wallet,
            'title': f"{tx_type.title()} Wallet",
            **self.admin_site.each_context(request), # This is crucial
        }
        return render(request, 'admin/wallet/wallet_transaction_form.html', context)


    def wallet_holder_name(self, obj):
        return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"