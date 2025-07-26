from django.contrib import admin
from .models import Secrets, ServiceCategory, Service, ServiceFormField, ServiceUsageLog
from django.utils.safestring import mark_safe
from django import forms

            
@admin.register(Secrets)
class SecretsAdmin(admin.ModelAdmin):
    list_display = ('id', 'provider_name', 'auth_type', 'created_at', 'updated_at')
    search_fields = ('provider_name',)
    list_filter = ('auth_type', 'created_at')
    

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'rank')
    search_fields = ('name',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'api_url','price_per_hit', 'is_active')
    search_fields = ('name', 'api_url')
    list_filter = ('category', 'is_active', 'api_method')
    ordering = ('category__name', 'name')
    autocomplete_fields = ['secret']


@admin.register(ServiceFormField)
class ServiceFormFieldAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'service', 'key', 'input_type', 'is_required')
    search_fields = ('label', 'key', 'service__name')
    list_filter = ('input_type', 'is_required')
    ordering = ('service__name', 'label')
    readonly_fields = ('validation_guide_display',)
    fieldsets = (
        (None, {
            'fields': (
                'service',
                'label',
                'key',
                'input_type',
                'is_required',
                'validation_rules',
                'placeholder',
                'help_text',
                'options',
                'condition_group',
            ),
        }),
        ("Validation Help Guide", {
            'fields': ('validation_guide_display',),
            'classes': ('collapse',),  # Optional: makes it collapsible
        }),
    )

    def validation_guide_display(self, obj=None):
        return mark_safe("""
            <div style="padding: 1em; background: #f9f9f9; border: 1px solid #ddd;">
                <strong>Available Validation Rules:</strong>
                <ul>
                    <li><code>{"type": "required"}</code> – Field must not be empty</li>
                    <li><code>{"type": "email"}</code> – Must be a valid email address</li>
                    <li><code>{"type": "numeric"}</code> – Only digits allowed</li>
                    <li><code>{"type": "integer"}</code> – Allows negative numbers, no decimals</li>
                    <li><code>{"type": "decimal"}</code> – Decimal numbers allowed</li>
                    <li><code>{"type": "alphaNum"}</code> – Only a-z, A-Z, 0-9 allowed</li>
                    <li><code>{"type": "minLength", "value": 4}</code> – Minimum 4 characters/digits</li>
                    <li><code>{"type": "maxLength", "value": 10}</code> – Max 10 characters/digits</li>
                    <li><code>{"type": "hasLength", "value": 6}</code> – Exactly 6 characters/digits</li>
                    <li><code>{"type": "hasMultipleLengths", "value": [6, 8, 10]}</code> – One of multiple lengths</li>
                </ul>
                <p>You can apply multiple rules at once. Example:</p>
                <pre>[{"type": "required"}, {"type": "numeric"}, {"type": "hasLength", "value": 10}]</pre>
            </div>
        """)
    validation_guide_display.short_description = "Validation Rules Reference"


@admin.register(ServiceUsageLog)
class ServiceUsageLogAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user_display', 'service', 'status',
        'http_status_code', 'created_at'
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