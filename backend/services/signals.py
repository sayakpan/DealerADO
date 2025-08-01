from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Service, HTTPStatusCode
from django.db import transaction

@receiver(post_save, sender=Service)
def ensure_deductible_codes(sender, instance, created, **kwargs):
    def set_defaults():
        if not instance.deductible_codes.exists():
            default_codes = HTTPStatusCode.objects.filter(code__in=[200, 201])
            if default_codes.exists():
                instance.deductible_codes.set(default_codes)
                print(f"Set default deductible codes for service {instance.name}")

    transaction.on_commit(set_defaults)