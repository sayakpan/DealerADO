from rest_framework import serializers

from services.rendering import render_response_with_schema
from .models import Service, ServiceCategory, ServiceFormField, ServiceUsageLog

class ServiceCategorySerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()
    service_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'description', 'rank', 'logo_url', 'cover_image_url', 'service_count']

    def get_logo_url(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url'):
            return request.build_absolute_uri(obj.logo.url)
        return None

    def get_cover_image_url(self, obj):
        request = self.context.get('request')
        if obj.cover_image and hasattr(obj.cover_image, 'url'):
            return request.build_absolute_uri(obj.cover_image.url)
        return None
    
    def get_service_count(self, obj):
        return obj.services.filter(is_active=True).count()
    
    def get_services(self, obj):
        request = self.context.get("request")
        active_services = obj.services.filter(is_active=True)
        return ServiceListItemSerializer(active_services, many=True, context={"request": request}).data
    
    
class ServiceListItemSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'price_per_hit', 'cover_image_url', 'short_description']

    def get_cover_image_url(self, obj):
        request = self.context.get('request')
        if obj.cover_image and hasattr(obj.cover_image, 'url'):
            return request.build_absolute_uri(obj.cover_image.url)
        return None
        
        
class ServiceCategoryDetailSerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'services'
        ]
        
    def get_services(self, obj):
        request = self.context.get("request")
        active_services = obj.services.filter(is_active=True)
        return ServiceListItemSerializer(active_services, many=True, context={"request": request}).data
        

class ServiceFormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFormField
        fields = [
            'input_type',
            'label',
            'key',
            'is_required',
            'help_text',
            'placeholder',
            'options',
            'validation_rules',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    form_fields = ServiceFormFieldSerializer(many=True, read_only=True)
    or_groups = serializers.SerializerMethodField()
    sample_response = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'name',
            'slug',
            'description',
            'price_per_hit',
            'is_active',
            'form_fields',
            'or_groups',
            'sample_response',
        ]
    
    def get_form_fields(self, obj):
        fields = obj.form_fields.all()
        return ServiceFormFieldSerializer(fields, many=True).data

    def get_or_groups(self, obj):
        from collections import defaultdict

        groups = defaultdict(list)
        for field in obj.form_fields.all():
            if field.condition_group:
                groups[field.condition_group].append(field)

        return [
            {
                "fields": [f.key for f in group_fields],
                "message": f"Please enter any one of: {', '.join(f.label for f in group_fields)}"
            }
            for group_fields in groups.values() if len(group_fields) > 1
        ]

    def get_sample_response(self, obj):
        rendered = render_response_with_schema(obj, obj.sample_response)
        return rendered


class ServiceUsageLogSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    wallet_txn_id = serializers.CharField(source='wallet_transaction.id', read_only=True)

    class Meta:
        model = ServiceUsageLog
        fields = [
            'id',
            'service_name',
            'form_data_sent',
            'api_response',
            'status',
            'http_status_code',
            'response_time_ms',
            'price_at_time',
            'wallet_txn_id',
            'created_at',
        ]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Clean error message if present
        api_response = data.get("api_response")
        if isinstance(api_response, dict) and "error" in api_response:
            raw_error = api_response["error"]
            if isinstance(raw_error, str):
                import re
                match = re.match(r'^(\d{3} [A-Za-z ]+):', raw_error)
                cleaned_error = match.group(1).strip() if match else raw_error.split(" for url")[0].strip()
                data["api_response"]["error"] = cleaned_error

        return data
    
    

class RenderPreviewInputSerializer(serializers.Serializer):
    service_slug = serializers.SlugField()
    payload = serializers.JSONField()