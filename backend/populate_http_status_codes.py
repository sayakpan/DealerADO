# populate_http_status_codes.py
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dealerado.settings')
django.setup()

print("Running HTTP status code seeding...")

from services.models import HTTPStatusCode

def populate_http_status_codes():
    standard_codes = [
        (200, "OK"),
        (201, "Created"),
        (202, "Accepted"),
        (204, "No Content"),
        (301, "Moved Permanently"),
        (302, "Found"),
        (400, "Bad Request"),
        (401, "Unauthorized"),
        (403, "Forbidden"),
        (404, "Not Found"),
        (500, "Internal Server Error"),
        (502, "Bad Gateway"),
    ]

    for code, description in standard_codes:
        obj, created = HTTPStatusCode.objects.get_or_create(code=code, defaults={"description": description})
        print(f"{'✅ Created' if created else 'ℹ️ Exists'}: {code} - {description}")

populate_http_status_codes()