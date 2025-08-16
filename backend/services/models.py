from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from wallet.models import TransactionLog
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
import json


User = get_user_model()

def generate_unique_slug(instance, model, slug_field, slug_base):
    slug = slugify(slug_base)
    original_slug = slug
    counter = 1

    while model.objects.filter(**{slug_field: slug}).exclude(pk=instance.pk).exists():
        slug = f"{original_slug}-{counter}"
        counter += 1

    return slug

def default_headers():
    return {"clientId": "", "secretKey": ""}


class Secrets(models.Model):
    AUTH_TYPE_CHOICES = [
        ('none', 'No Auth'),
        ('bearer_token', 'Bearer Token'),
        ('custom_headers', 'Custom Headers'),
    ]

    provider_name = models.CharField(max_length=100, verbose_name="Provider Name", help_text="Name of the API provider (e.g., Surepass, Invincible)")
    auth_type = models.CharField(max_length=50, choices=AUTH_TYPE_CHOICES, default='none', verbose_name="Authentication Type")
    bearer_token = models.TextField(blank=True, null=True, verbose_name="Bearer Token", help_text="Used when Authentication Type is 'Bearer Token'. Example: 'eyJhbGciOi...'")
    headers = models.JSONField(blank=True, null=True, default=default_headers, verbose_name="Custom Headers", help_text="Used when Authentication Type is 'Custom Headers'. Example: {\"clientId\": \"abc\", \"secretKey\": \"xyz\"}")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Secret"
        verbose_name_plural = "Secrets"

    def __str__(self):
        return f"{self.provider_name} ({self.get_auth_type_display()}) - {self.id}"
    
    def clean(self):
        if self.auth_type == 'bearer_token' and not self.bearer_token:
            raise ValidationError({'bearer_token': 'Bearer Token is required for bearer_token auth.'})

        if self.auth_type == 'custom_headers' and not self.headers:
            raise ValidationError({'headers': 'Custom headers are required for custom_headers auth.'})
        
        
class HTTPStatusCode(models.Model):
    code = models.PositiveIntegerField(unique=True)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "HTTP Status Code"
        verbose_name_plural = "HTTP Status Codes"
        ordering = ["code"]

    def __str__(self):
        return f"{self.code} - {self.description or 'No Description'}"
    

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Category Name")
    slug = models.SlugField(null=True, blank=True, max_length=100, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Description")
    rank = models.PositiveIntegerField(default=0, verbose_name="Display Order")
    logo = models.ImageField(upload_to="service_categories/logos/", blank=True, null=True, verbose_name="Logo")
    cover_image = models.ImageField(upload_to="service_categories/covers/", blank=True, null=True, verbose_name="Cover Image")

    class Meta:
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(
                instance=self,
                model=ServiceCategory,
                slug_field='slug',
                slug_base=self.name
            )
        super().save(*args, **kwargs)


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE,
        related_name='services',
        verbose_name="Service Category",
    )
    name = models.CharField(max_length=100, verbose_name="Service Name")
    slug = models.SlugField(null=True, blank=True, max_length=100, verbose_name="Slug")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    api_url = models.URLField(verbose_name="API Endpoint")
    api_method = models.CharField(
        max_length=10,
        choices=[('GET', 'GET'), ('POST', 'POST')],
        verbose_name="HTTP Method"
    )
    secret = models.ForeignKey(Secrets, on_delete=models.SET_NULL, null=True, blank=True, related_name='services', verbose_name="Linked Secret", help_text="Which secret this service should use for authentication")
    price_per_hit = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price Per Hit")
    deductible_codes = models.ManyToManyField(
        HTTPStatusCode,
        blank=True,
        related_name='services',
        verbose_name="Deductible Status Codes",
        help_text="Wallet will be deducted only if the response status code is in this list."
    )
    cover_image = models.ImageField(upload_to="services/covers/", blank=True, null=True, verbose_name="Cover Image")
    description = CKEditor5Field(blank=True, verbose_name="Description")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(
                instance=self,
                model=Service,
                slug_field='slug',
                slug_base=self.name
            )
        super().save(*args, **kwargs)


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

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='form_fields', verbose_name="Service")
    label = models.CharField(max_length=100, verbose_name="Field Label")
    key = models.CharField(max_length=100, help_text="Key to be used in API payload", verbose_name="Payload Key")
    input_type = models.CharField(max_length=20, choices=INPUT_TYPES, verbose_name="Input Type")
    is_required = models.BooleanField(default=True, verbose_name="Is Required")
    help_text = models.TextField(blank=True, verbose_name="Help Text")
    placeholder = models.CharField(max_length=255, blank=True, verbose_name="Placeholder")
    options = models.JSONField(blank=True, null=True, help_text="Applicable for select, radio, checkbox fields", verbose_name="Options")
    condition_group = models.CharField(max_length=50, blank=True, help_text="Fields in same group share OR condition", verbose_name="Condition Group")
    validation_rules = models.JSONField(
        blank=True,
        null=True,
        default=list,
        help_text='Use format like: [{"type": "alphaNum"}, {"type": "hasLength", "value": 10}]',
        verbose_name="Validation Rules"
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
        if self.validation_rules:
            if not isinstance(self.validation_rules, list):
                raise ValidationError({"validation_rules": "Must be a list of validation rule objects."})
            for rule in self.validation_rules:
                if not isinstance(rule, dict) or "type" not in rule:
                    raise ValidationError({"validation_rules": "Each rule must be a dict with a 'type' key."})

                if rule["type"] in ["minLength", "maxLength", "hasLength"] and "value" not in rule:
                    raise ValidationError({"validation_rules": f"'{rule['type']}' requires a numeric 'value'"})

                if rule["type"] == "hasMultipleLengths" and not isinstance(rule.get("value"), list):
                    raise ValidationError({"validation_rules": "'hasMultipleLengths' requires a list of values"})
        

class ServiceUsageLog(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('timeout', 'Timeout'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    full_url = models.URLField(blank=True, null=True, help_text="Full URL used for the API call")
    form_data_sent = models.JSONField()
    api_response = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    http_status_code = models.PositiveIntegerField(blank=True, null=True)
    response_time_ms = models.PositiveIntegerField(blank=True, null=True)
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2)
    wallet_transaction = models.ForeignKey(TransactionLog, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} ({self.user or 'Anonymous'}) - {self.status}"
    
    class Meta:
        verbose_name = "Service Usage Log"
        verbose_name_plural = "Service Usage Logs"
        

def default_spec():
    return {
        "service": None,
        "map": {},
        "formatters": {},
        "header": {
            "left": {"type": "text", "label": "Title", "source": None, "bold": True, "size": 16},
            "right": {"type": "kv", "label": "Ref", "source": None, "align": "right"}
        },
        "sections": [],
        "security": {"mask": [], "redact": []}
    }


class RenderSchema(models.Model):
    service = models.OneToOneField(
        "services.Service",
        related_name="schema",
        on_delete=models.CASCADE
    )
    spec = models.JSONField(default=default_spec)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "render_schema"
        verbose_name = "Render Schema"
        verbose_name_plural = "Render Schemas"
        
    def __str__(self):
        return f"Schema for {self.service.name} ({self.service.pk})"
    
    def clean(self):
        if not isinstance(self.spec, dict):
            raise ValidationError({"spec": "Spec must be a JSON object."})
        for key in ["service", "map", "header", "sections"]:
            if key not in self.spec:
                raise ValidationError({"spec": f"Missing required key: '{key}'"})
        if not isinstance(self.spec.get("map"), dict):
            raise ValidationError({"spec": "'map' must be an object."})
        header = self.spec.get("header")
        if not isinstance(header, dict) or "left" not in header or "right" not in header:
            raise ValidationError({"spec": "'header' must have 'left' and 'right' blocks."})
        
        
