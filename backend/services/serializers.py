from rest_framework import serializers
from .models import Service, ServiceCategory, ServiceFormField

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
        fields = ['id', 'name', 'slug', 'price_per_hit', 'cover_image_url']

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