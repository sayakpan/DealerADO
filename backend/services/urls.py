from django.urls import path
from .views import ServiceCategoryDetailAPIView, ServiceCategoryListAPIView, ServiceDetailAPIView, submit_service_form

urlpatterns = [
    path('categories/', ServiceCategoryListAPIView.as_view(), name='service-category-list'),
    path('categories/<slug:slug>/', ServiceCategoryDetailAPIView.as_view(), name='service-category-detail'),
    path('service/<slug:slug>/', ServiceDetailAPIView.as_view(), name='service-detail'),
    path('service/<slug:slug>/submit/', submit_service_form, name='submit_service_form'),
]