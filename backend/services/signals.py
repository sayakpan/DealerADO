from django.db.models.signals import post_save, post_migrate
from django.apps import apps
from django.dispatch import receiver
from .models import Service, HTTPStatusCode, RenderSchema
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


@receiver(post_save, sender=Service)
def create_schema_for_service(sender, instance: Service, created, **kwargs):
    if not created:
        return
    schema, _ = RenderSchema.objects.get_or_create(service=instance)
    spec = dict(schema.spec or {})
    spec["service"] = getattr(instance, "slug", str(instance.pk))
    schema.spec = spec
    schema.save(update_fields=["spec"])
    
@receiver(post_migrate)
def ensure_schema_for_existing_services(sender, **kwargs):
    ServiceModel = apps.get_model("services", "Service")
    if ServiceModel._meta.app_label != "services":
        return
    for svc in ServiceModel.objects.all():
        schema, _ = RenderSchema.objects.get_or_create(service=svc)
        spec = dict(schema.spec or {})
        if not spec.get("service"):
            spec["service"] = getattr(svc, "slug", str(svc.pk))
            schema.spec = spec
            schema.save(update_fields=["spec"])