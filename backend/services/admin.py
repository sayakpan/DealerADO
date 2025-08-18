from django.contrib import admin, messages
from .models import Secrets, ServiceCategory, Service, ServiceFormField, ServiceUsageLog, HTTPStatusCode, RenderSchema
from django.utils.safestring import mark_safe
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from import_export import resources
from import_export.admin import ExportMixin
from import_export.formats.base_formats import CSV, XLSX
from django.utils.html import format_html


@admin.register(Secrets)
class SecretsAdmin(admin.ModelAdmin):
    list_display = ('id', 'provider_name', 'auth_type', 'created_at', 'updated_at')
    search_fields = ('provider_name',)
    list_filter = ('auth_type', 'created_at')

@admin.register(HTTPStatusCode)
class HTTPStatusCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'description')
    search_fields = ('code', 'description')

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'rank')
    search_fields = ('name',)


class ServiceAdminForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = '__all__'
        widgets = {
            'description': CKEditor5Widget(config_name='default'),
        }
        
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    filter_horizontal = ('deductible_codes',)
    list_display = ('id', 'name', 'category', 'api_url','price_per_hit', 'is_active')
    search_fields = ('name', 'api_url')
    list_filter = ('category', 'is_active', 'api_method')
    ordering = ('-created_at',)
    autocomplete_fields = ['secret', 'category']


@admin.register(ServiceFormField)
class ServiceFormFieldAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'service', 'key', 'input_type', 'is_required')
    search_fields = ('label', 'key', 'service__name')
    list_filter = ('input_type', 'is_required')
    readonly_fields = ('validation_guide_display',)
    autocomplete_fields = ['service']
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



class ServiceUsageLogResource(resources.ModelResource):
    class Meta:
        model = ServiceUsageLog
        fields = (
            "id", 
            "user__username", 
            "service__name", 
            "status", 
            "created_at", 
            "full_url", 
            "http_status_code", 
            "response_time_ms", 
            "price_at_time", 
            "form_data_sent", 
            "api_response"
        )
        export_order = (
            "id", 
            "user__username", 
            "service__name", 
            "status", 
            "created_at", 
            "full_url", 
            "http_status_code", 
            "response_time_ms", 
            "price_at_time", 
            "form_data_sent", 
            "api_response")
        import_id_fields = [] 

@admin.register(ServiceUsageLog)
class ServiceUsageLogAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = ServiceUsageLogResource
    formats = [CSV, XLSX]
    list_display = (
        'id', 'user_display', 'service', 'colored_status',
        'http_status_code', 'created_at'
    )
    list_filter = ('service', 'status', 'created_at')
    search_fields = ('user__first_name', 'user__last_name', 'user__email')
    # readonly_fields = (
    #     'user', 'service', 'form_data_sent', 'api_response', 'status',
    #     'http_status_code', 'response_time_ms', 'price_at_time',
    #     'wallet_transaction', 'created_at'
    # )
    ordering = ('-created_at',)

    # def has_add_permission(self, request):
    #     return False  # disallow adding logs manually

    # def has_change_permission(self, request, obj=None):
    #     return False  # make all logs readonly

    def user_display(self, obj):
        return f"{obj.user.get_full_name() if obj.user else 'Anonymous'}"
    user_display.short_description = 'User'
    
    def colored_status(self, obj):
        status_text = obj.status.capitalize()
        if obj.status.lower() == "success":
            return format_html('<span style="color: green;">{}</span>', status_text)
        elif obj.status.lower() == "failed":
            return format_html('<span style="color: red;">{}</span>', status_text)
        return status_text  # fallback for other statuses

    colored_status.short_description = "Status"


    
@admin.register(RenderSchema)
class RenderSchemaAdmin(admin.ModelAdmin):
    list_display = ("id", "service", "created_at", "updated_at")
    search_fields = ("service__slug", "service__name")
    readonly_fields = ("created_at", "updated_at", "schema_guide_display")
    actions = ["validate_spec"]
    fieldsets = (
        (None, {
            "fields": ("service", "spec", "created_at", "updated_at"),
        }),
        ("Schema Authoring Guide", {
            "fields": ("schema_guide_display",),
            "classes": ("collapse",),
        }),
    )

    def validate_spec(self, request, queryset):
        ok = 0
        for schema in queryset:
            try:
                schema.full_clean()
                ok += 1
            except Exception as e:
                self.message_user(request, f"{schema} failed: {e}", level=messages.ERROR)
        if ok:
            self.message_user(request, f"Validated {ok} schema(s) successfully.", level=messages.SUCCESS)
    validate_spec.short_description = "Validate selected schema specs"

    def schema_guide_display(self, obj=None):
        return mark_safe("""
<style>
.render-guide {
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    line-height: 1.5;
    color: #333;
}

.render-guide code, 
.render-guide pre {
    font-size: 13px;
    background: #f4f4f4;
    border-radius: 4px;
    padding: 2px 6px;
}

.render-guide pre {
    padding: 10px;
    overflow-x: auto;
    border: 1px solid #ddd;
}

.render-guide h3 {
    margin: 12px 0 8px;
    font-size: 1.1em;
    color: #222;
    border-bottom: 2px solid #eee;
    padding-bottom: 3px;
}

.render-guide h4 {
    margin: 10px 0 6px;
    font-size: 1em;
    color: #444;
}

.render-guide ul {
    margin: 6px 0 10px 20px;
}

.render-guide li {
    margin-bottom: 4px;
}

.render-guide details {
    margin: 8px 0 10px;
}

.render-guide summary {
    font-weight: 600;
    cursor: pointer;
}

.render-guide .box {
    padding: 12px;
    background: #fdfdfd;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
</style>

<div class="render-guide box">
    <h3>Schema Structure</h3>
    <p><code>spec</code> is a JSON object that defines how an API response is normalized and rendered.</p>

    <h4>Top-level keys</h4>
    <ul>
        <li><code>service</code> (string) – Identifier; if omitted it is set to the Service's <code>slug</code>.</li>
        <li><code>map</code> (object) – Maps friendly variable names to JSON paths in the raw response.</li>
        <li><code>header</code> (object) – Two items: <code>left</code> and <code>right</code> to show at the top.</li>
        <li><code>sections</code> (array) – Array of sections, each with a <code>title</code> and <code>items</code>.</li>
        <li><code>security</code> (object) – Optional masking and redaction of sensitive values.</li>
        <li><code>formatters</code> (object) – Optional reusable formatters used by items and security rules.</li>
    </ul>

    <h4>map</h4>
    <p>Define variables for use in <code>header</code> and <code>sections</code>. Supports dotted paths and fallback with <code>||</code>.</p>
<pre>{
  "map": {
    "owner": "result.data.owner",
    "reg_no": "result.data.regNo",
    "name": "result.fname || result.full_name"
  }
}</pre>

    <h4>header</h4>
    <p>Two blocks: <code>left</code> and <code>right</code>. Each is an item with:</p>
    <ul>
        <li><code>type</code>: <code>"text"</code> or <code>"kv"</code></li>
        <li><code>label</code>: Label text (for <code>kv</code>)</li>
        <li><code>source</code>: A variable from <code>map</code></li>
        <li><code>bold</code>, <code>size</code>: Optional typography for <code>text</code></li>
        <li><code>format</code>: Optional formatter name</li>
    </ul>
<pre>{
  "header": {
    "left":  { "type": "text", "label": "Owner", "source": "owner", "bold": true, "size": 16 },
    "right": { "type": "kv",   "label": "Registration No.", "source": "reg_no", "align": "right" }
  }
}</pre>

    <h4>sections</h4>
    <p>Each section has a <code>title</code> and an <code>items</code> array.</p>
    <p>Supported item types:</p>
    <ul>
        <li><code>kv</code> – <code>{"type":"kv","label":"Status","source":"status","format":"yes_no"}</code></li>
        <li><code>text</code> – <code>{"type":"text","label":"Note","source":"note"}</code></li>
        <li><code>address</code> – <code>{"type":"address","source":"address"}</code> (expects an object with standard address keys)</li>
        <li><code>table</code> – <code>{"type":"table","source":"rows_var","columns":[{"key":"...","title":"..."}],"empty":"No data"}</code></li>
    </ul>
<pre>{
  "sections": [
    {
      "title": "Vehicle Summary",
      "items": [
        {"type":"kv","label":"Status","source":"status"},
        {"type":"kv","label":"Commercial","source":"is_commercial","format":"yes_no"}
      ]
    }
  ]
}</pre>

    <h4>security</h4>
    <p><code>mask</code> modifies values in-place using a formatter. <code>redact</code> removes keys entirely from the normalized context.</p>
<pre>{
  "security": {
    "mask":   [{ "path": "pan", "format": "mask_pan" }],
    "redact": ["mobile_number"]
  }
}</pre>

    <h4>formatters</h4>
    <ul>
        <li><code>mask</code> – args: <code>{"visible_last":4,"char":"X"}</code></li>
        <li><code>yes_no</code> – renders booleans as Yes/No</li>
        <li><code>currency_inr</code> – formats numbers as INR (e.g., ₹12,345)</li>
    </ul>
<pre>{
  "formatters": {
    "mask_pan": { "fn": "mask", "args": {"visible_last": 4} },
    "yes_no":   { "fn": "yes_no" }
  }
}</pre>

    <details>
      <summary>Example: RC Lookup</summary>
<pre>{
  "service": "rc-lookup",
  "map": {
    "owner": "result.data.owner",
    "owner_father": "result.data.ownerFatherName",
    "reg_no": "result.data.regNo",
    "status": "result.data.status",
    "status_as_on": "result.data.statusAsOn",
    "type": "result.data.type",
    "class": "result.data.class",
    "model": "result.data.model",
    "manufacturer": "result.data.vehicleManufacturerName",
    "manuf_month_year": "result.data.vehicleManufacturingMonthYear",
    "body_type": "result.data.bodyType",
    "color": "result.data.vehicleColour",
    "engine_no": "result.data.engine",
    "chassis_no": "result.data.chassis",
    "cubic_capacity": "result.data.vehicleCubicCapacity",
    "cylinders": "result.data.vehicleCylindersNo",
    "seat_capacity": "result.data.vehicleSeatCapacity",
    "standing_capacity": "result.data.vehicleStandingCapacity",
    "sleeper_capacity": "result.data.vehicleSleeperCapacity",
    "unladen_weight": "result.data.unladenWeight",
    "gross_vehicle_weight": "result.data.grossVehicleWeight",
    "wheelbase": "result.data.wheelbase",
    "norms_type": "result.data.normsType",
    "vehicle_category": "result.data.vehicleCategory",
    "is_commercial": "result.data.isCommercial",
    "reg_date": "result.data.regDate",
    "rc_expiry_date": "result.data.rcExpiryDate",
    "insurance_company": "result.data.vehicleInsuranceCompanyName",
    "insurance_policy_no": "result.data.vehicleInsurancePolicyNumber",
    "insurance_upto": "result.data.vehicleInsuranceUpto",
    "pucc_number": "result.data.puccNumber",
    "pucc_upto": "result.data.puccUpto",
    "tax_upto": "result.data.vehicleTaxUpto",
    "blacklist_status": "result.data.blacklistStatus",
    "blacklist_details": "result.data.blacklistDetails",
    "financed": "result.data.financed",
    "reg_authority": "result.data.regAuthority",
    "present_address": "result.data.presentAddress",
    "permanent_address": "result.data.permanentAddress",
    "db_result": "result.data.dbResult",
    "partial_data": "result.data.partialData",
    "mobile_number": "result.data.mobileNumber"
  },
  "header": {
    "left":  {"type": "text", "label": "Owner", "source": "owner", "bold": true, "size": 16},
    "right": {"type": "kv", "label": "Registration No.", "source": "reg_no", "align": "right"}
  },
  "sections": [
    {
      "title": "Vehicle Summary",
      "items": [
        {"type": "kv", "label": "Status", "source": "status"},
        {"type": "kv", "label": "Status As On", "source": "status_as_on"},
        {"type": "kv", "label": "Class", "source": "class"},
        {"type": "kv", "label": "Type", "source": "type"},
        {"type": "kv", "label": "Model", "source": "model"},
        {"type": "kv", "label": "Manufacturer", "source": "manufacturer"},
        {"type": "kv", "label": "Manufactured (MM/YY)", "source": "manuf_month_year"},
        {"type": "kv", "label": "Body Type", "source": "body_type"},
        {"type": "kv", "label": "Colour", "source": "color"},
        {"type": "kv", "label": "Registration Authority", "source": "reg_authority"}
      ]
    },
    {
      "title": "Technical Details",
      "items": [
        {"type": "kv", "label": "Engine No.", "source": "engine_no"},
        {"type": "kv", "label": "Chassis No.", "source": "chassis_no"},
        {"type": "kv", "label": "Cubic Capacity", "source": "cubic_capacity"},
        {"type": "kv", "label": "Cylinders", "source": "cylinders"},
        {"type": "kv", "label": "Seat Capacity", "source": "seat_capacity"},
        {"type": "kv", "label": "Standing Capacity", "source": "standing_capacity"},
        {"type": "kv", "label": "Sleeper Capacity", "source": "sleeper_capacity"},
        {"type": "kv", "label": "Unladen Weight", "source": "unladen_weight"},
        {"type": "kv", "label": "Gross Vehicle Weight", "source": "gross_vehicle_weight"},
        {"type": "kv", "label": "Wheelbase", "source": "wheelbase"},
        {"type": "kv", "label": "Emission Norms", "source": "norms_type"},
        {"type": "kv", "label": "Vehicle Category", "source": "vehicle_category"},
        {"type": "kv", "label": "Commercial", "source": "is_commercial", "format": "yes_no"}
      ]
    },
    {
      "title": "Validity & Compliance",
      "items": [
        {"type": "kv", "label": "Registration Date", "source": "reg_date"},
        {"type": "kv", "label": "RC Expiry", "source": "rc_expiry_date"},
        {"type": "kv", "label": "Insurance Company", "source": "insurance_company"},
        {"type": "kv", "label": "Insurance Policy No.", "source": "insurance_policy_no"},
        {"type": "kv", "label": "Insurance Valid Upto", "source": "insurance_upto"},
        {"type": "kv", "label": "PUCC Number", "source": "pucc_number"},
        {"type": "kv", "label": "PUCC Valid Upto", "source": "pucc_upto"},
        {"type": "kv", "label": "Road Tax Upto", "source": "tax_upto"}
      ]
    },
    {
      "title": "Ownership & Risk",
      "items": [
        {"type": "kv", "label": "Owner (Father's Name)", "source": "owner_father"},
        {"type": "kv", "label": "Blacklist Status", "source": "blacklist_status", "format": "yes_no"},
        {"type": "kv", "label": "Financed", "source": "financed"},
        {"type": "kv", "label": "Database Verified", "source": "db_result", "format": "yes_no"},
        {"type": "kv", "label": "Partial Data", "source": "partial_data", "format": "yes_no"}
      ]
    },
    {
      "title": "Contact & Addresses",
      "items": [
        {"type": "kv", "label": "Mobile Number", "source": "mobile_number"},
        {"type": "kv", "label": "Present Address", "source": "present_address"},
        {"type": "kv", "label": "Permanent Address", "source": "permanent_address"}
      ]
    }
  ],
  "security": { "mask": [], "redact": [] },
  "formatters": { "yes_no": { "fn": "yes_no" } }
}</pre>
    </details>

    <details>
      <summary>Example: PAN Lookup</summary>
<pre>{
  "service": "pan-lookup",
  "map": {
    "pan": "result.pan_number",
    "name": "result.fname || result.full_name",
    "address": "result.address",
    "proprietor_rows": "result.is_sole_proprietor.info"
  },
  "header": {
    "left":  { "type": "text", "label": "Full Name", "source": "name", "bold": true, "size": 16 },
    "right": { "type": "kv", "label": "PAN", "source": "pan", "format": "mask_pan", "align": "right" }
  },
  "sections": [
    {
      "title": "Identity",
      "items": [
        { "type": "address", "source": "address" }
      ]
    },
    {
      "title": "Proprietor Details",
      "items": [
        {
          "type": "table",
          "source": "proprietor_rows",
          "empty": "No data",
          "columns": [
            { "key": "gst", "title": "GST" },
            { "key": "status", "title": "Status" },
            { "key": "aggregate_turn_over", "title": "Turnover" }
          ]
        }
      ]
    }
  ],
  "security": { "mask": [{ "path": "pan", "format": "mask_pan" }], "redact": [] },
  "formatters": { "mask_pan": { "fn": "mask", "args": { "visible_last": 4 } } }
}</pre>
    </details>
</div>
        """)
    schema_guide_display.short_description = "How to write the schema"