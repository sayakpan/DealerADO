# wallet/urls.py

from django.urls import path
from .views import WalletSummaryView

urlpatterns = [
    path('', WalletSummaryView.as_view(), name='wallet-summary'),
]