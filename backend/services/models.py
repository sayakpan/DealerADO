from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from wallet.models import TransactionLog
import json

User = get_user_model()


class ServiceCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Category Name")
    description = models.TextField(blank=True, verbose_name="Description")
    rank = models.PositiveIntegerField(default=0, verbose_name="Display Order")

    class Meta:
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE,
        related_name='services',
        verbose_name="Service Category"
    )
    name = models.CharField(max_length=100, verbose_name="Service Name")
    description = models.TextField(blank=True, verbose_name="Description")
    api_url = models.URLField(verbose_name="API Endpoint")
    api_method = models.CharField(
        max_length=10,
        choices=[('GET', 'GET'), ('POST', 'POST')],
        verbose_name="HTTP Method"
    )
    api_key = models.CharField(max_length=255, blank=True, null=True, verbose_name="API Key")
    price_per_hit = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price Per Hit")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.name


class ServiceFormField(models.Model):
    INPUT_TYPES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('email', 'Email'),
        ('select', 'Select'),
        ('radio', 'Radio'),
        ('checkbox', 'Checkbox'),
        ('date', 'Date'),
        ('textarea', 'Textarea'),
    ]

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='form_fields',
        verbose_name="Service"
    )
    label = models.CharField(max_length=100, verbose_name="Field Label")
    key = models.CharField(max_length=100, help_text="Key to be used in API payload", verbose_name="Payload Key")
    input_type = models.CharField(max_length=20, choices=INPUT_TYPES, verbose_name="Input Type")
    is_required = models.BooleanField(default=True, verbose_name="Is Required")
    validation_regex = models.CharField(max_length=255, blank=True, null=True, verbose_name="Validation Regex")
    placeholder = models.CharField(max_length=255, blank=True, verbose_name="Placeholder")
    options = models.JSONField(
        blank=True,
        null=True,
        help_text="Applicable for select, radio, checkbox fields",
        verbose_name="Options"
    )
    condition_group = models.CharField(
        max_length=50,
        blank=True,
        help_text="Fields in same group share OR condition",
        verbose_name="Condition Group"
    )

    class Meta:
        verbose_name = "Service Form Field"
        verbose_name_plural = "Service Form Fields"

    def __str__(self):
        return f"{self.label} ({self.service.name})"

    def clean(self):
        if self.input_type in ['select', 'radio'] and not self.options:
            raise ValidationError(f"Field '{self.label}' must have 'options' set for input type '{self.input_type}'.")
        if self.options:
            # Basic check if options is valid JSON and an array of objects
            try:
                options_data = self.options
                if not isinstance(options_data, list):
                    raise ValidationError(
                        {'options': 'Options must be a JSON array.'}
                    )
                for item in options_data:
                    if not isinstance(item, dict) or 'value' not in item or 'label' not in item:
                        raise ValidationError(
                            {'options': 'Each option in the array must be an object with "value" and "label" keys.'}
                        )
            except (json.JSONDecodeError, TypeError):
                raise ValidationError(
                    {'options': 'Invalid JSON format for options.'}
                )
        

class ServiceUsageLog(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('timeout', 'Timeout'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    form_data_sent = models.JSONField()
    api_response = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    http_status_code = models.PositiveIntegerField(blank=True, null=True)
    response_time_ms = models.PositiveIntegerField(blank=True, null=True)
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2)
    wallet_transaction = models.ForeignKey(TransactionLog, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} by {self.user or 'Anonymous'} at {self.created_at}"
    
    class Meta:
        verbose_name = "Service Usage Log"
        verbose_name_plural = "Service Usage Logs"