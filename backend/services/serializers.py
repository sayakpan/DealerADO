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
        return obj.services.count()
    
    
class ServiceListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'price_per_hit']
        
        
class ServiceCategoryDetailSerializer(serializers.ModelSerializer):
    services = ServiceListItemSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'services'
        ]
        

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
            'condition_group',
            'validation_rules',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    form_fields = ServiceFormFieldSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'name',
            'slug',
            'description',
            'price_per_hit',
            'is_active',
            'form_fields',
        ]