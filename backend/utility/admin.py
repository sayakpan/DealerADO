from django.contrib import admin
from .models import Banner, BannerImage

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'images_count')
    search_fields = ('name', 'slug')
    filter_horizontal = ('images',)
    
    def images_count(self, obj):
        return obj.images.count()
    images_count.short_description = "Images"

@admin.register(BannerImage)
class BannerImageAdmin(admin.ModelAdmin):
    list_display = ('image', 'caption', 'order')
    search_fields = ('caption',)
