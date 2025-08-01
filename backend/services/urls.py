from django.urls import path
from .views import ServiceCategoryDetailAPIView, ServiceCategoryListAPIView, ServiceDetailAPIView, UserServiceUsageLogListView, delete_service_pdf, generate_pdf_from_log, submit_service_form

urlpatterns = [
    path('categories/', ServiceCategoryListAPIView.as_view(), name='service-category-list'),
    path('categories/<slug:slug>/', ServiceCategoryDetailAPIView.as_view(), name='service-category-detail'),
    path('service/<slug:slug>/', ServiceDetailAPIView.as_view(), name='service-detail'),
    path('service/<slug:slug>/submit/', submit_service_form, name='submit_service_form'),
    path("usage-logs/", UserServiceUsageLogListView.as_view(), name="user-service-usage-logs"),
    path("generate-pdf/", generate_pdf_from_log, name="generate-pdf-from-log"),
    path("delete-pdf/", delete_service_pdf, name="delete_service_pdf"),
]