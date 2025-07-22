from django.contrib import admin
from .models import ServiceCategory, Service, ServiceFormField, ServiceUsageLog


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'rank')
    search_fields = ('name',)
    ordering = ('rank',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'api_url', 'api_method', 'price_per_hit', 'is_active')
    search_fields = ('name', 'api_url')
    list_filter = ('category', 'is_active', 'api_method')
    ordering = ('category__name', 'name')


@admin.register(ServiceFormField)
class ServiceFormFieldAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'service', 'key', 'input_type', 'is_required')
    search_fields = ('label', 'key', 'service__name')
    list_filter = ('input_type', 'is_required')
    ordering = ('service__name', 'label')


@admin.register(ServiceUsageLog)
class ServiceUsageLogAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user_display', 'service', 'status', 'price_at_time',
        'http_status_code', 'response_time_ms', 'created_at'
    )
    list_filter = ('service', 'status', 'created_at')
    search_fields = ('user__first_name', 'user__last_name', 'user__email')
    readonly_fields = (
        'user', 'service', 'form_data_sent', 'api_response', 'status',
        'http_status_code', 'response_time_ms', 'price_at_time',
        'wallet_transaction', 'created_at'
    )
    ordering = ('-created_at',)

    def has_add_permission(self, request):
        return False  # disallow adding logs manually

    def has_change_permission(self, request, obj=None):
        return False  # make all logs readonly

    def user_display(self, obj):
        return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"
    user_display.short_description = 'User'