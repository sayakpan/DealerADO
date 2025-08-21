from django.db import models
from django.forms import ValidationError
from django.utils.text import slugify

from services.models import generate_unique_slug


class BannerImage(models.Model):
    image = models.ImageField(upload_to='banners/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Order of the image in the carousel.")
    
    def save(self, *args, **kwargs):
        if not self.caption:
            self.caption = f"Image {self.order + 1}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.caption or 'no caption'}"
    
    class Meta:
        verbose_name = "Banner Image"
        verbose_name_plural = "Banner Images"

# Create your models here.
class Banner(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(null=True, blank=True, max_length=100, verbose_name="Slug", help_text="You don't need to fill this, it will be generated automatically.")
    images = models.ManyToManyField('BannerImage', related_name='banners', blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(
                instance=self,
                model=Banner,
                slug_field='slug',
                slug_base=self.name
            )
        super().save(*args, **kwargs)

    def get_ordered_images(self):
        return self.images.all().order_by('order')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Banners"
