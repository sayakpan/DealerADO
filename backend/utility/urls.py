# utilities/urls.py
from django.urls import path
from .views import BannerDetailView

urlpatterns = [
    path('banner/<slug:slug>/', BannerDetailView.as_view(), name='banner-detail'),
]
