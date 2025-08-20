# wallet/urls.py

from django.urls import path
from .views import WalletBalanceView, WalletSummaryView

urlpatterns = [
    path('', WalletSummaryView.as_view(), name='wallet-summary'),
    path("balance/", WalletBalanceView.as_view(), name="wallet-balance"),
]