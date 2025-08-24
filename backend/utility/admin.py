from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.decorators import display
from django.utils.translation import gettext_lazy as _
from .models import Banner, BannerImage

@admin.register(Banner)
class BannerAdmin(ModelAdmin):
    compressed_fields = True
    list_display = ('name', 'slug', 'images_count', 'has_images')
    search_fields = ('name', 'slug')
    filter_horizontal = ('images',)

    def images_count(self, obj):
        return obj.images.count()
    images_count.short_description = "Images"

    @display(description=_("Has Images"), boolean=True)
    def has_images(self, obj):
        return obj.images.exists()


@admin.register(BannerImage)
class BannerImageAdmin(ModelAdmin):
    compressed_fields = True
    list_display = ('id', 'image', 'caption', 'order')
    search_fields = ('caption',)