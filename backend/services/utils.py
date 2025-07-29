from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from django.conf import settings
from django.utils.timezone import now
from django.conf import settings
from django.core.files.storage import default_storage
import os
from io import BytesIO
import re
from textwrap import wrap


def prettify_key(key: str) -> str:
    if not isinstance(key, str):
        return str(key)

    # Convert snake_case to words
    if "_" in key:
        parts = key.split("_")
    else:
        # Split camelCase or PascalCase using regex
        parts = re.findall(r'[A-Z]?[a-z]+|[A-Z]+(?![a-z])', key)

    # Capitalize each part
    pretty = " ".join([part.capitalize() for part in parts if part])

    return pretty


def draw_wrapped_string(p, x, y, text, max_chars=100, line_height=0.6 * cm, font_name="Helvetica", font_size=11):
    p.setFont(font_name, font_size)
    lines = wrap(str(text), width=max_chars)
    for line in lines:
        p.drawString(x, y, line)
        y -= line_height
    return y


def render_data_recursive(p, data, x, y, indent=0, page_height=A4[1]):
    indent_space = 1.2 * cm * indent
    line_height = 0.6 * cm
    x_offset = x + indent_space

    def check_page_space(p, y):
        if y < 2.5 * cm:
            p.showPage()
            y = page_height - 2.5 * cm
            p.setFont("Helvetica", 11)
        return y

    # === If it's a dictionary ===
    if isinstance(data, dict):
        for key, value in data.items():
            y = check_page_space(p, y)
            pretty_key = prettify_key(key)

            if value is None:
                y = draw_wrapped_string(p, x_offset, y, key=pretty_key, value="Not Available")
            if isinstance(value, (str, int, float, bool)) or value is None:
                p.setFont("Helvetica", 11)
                label = f"{pretty_key}: {value}"
                y = draw_wrapped_string(p, x_offset, y, label)
            else:
                p.setFont("Helvetica-Bold", 11)
                p.drawString(x_offset, y, f"{pretty_key}:")
                y -= line_height
                y = render_data_recursive(p, value, x, y, indent + 1, page_height)

    # === If it's a list ===
    elif isinstance(data, list):
        for idx, item in enumerate(data):
            y = check_page_space(p, y)
            p.setFont("Helvetica-Bold", 11)
            p.drawString(x_offset, y, f"{idx + 1})")
            y -= line_height
            y = render_data_recursive(p, item, x, y, indent + 1, page_height)
            y -= 0.3 * cm  # extra space between list items

    # === If it's a simple value ===
    else:
        y = check_page_space(p, y)
        display = str(data)
        if len(display) > 100:
            display = display[:100] + "..."
        p.setFont("Helvetica", 11)
        y = draw_wrapped_string(p, x_offset, y, display)

    return y


def generate_service_pdf(service_name, response_data, user):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # === Logo ===
    logo_path = os.path.join(settings.BASE_DIR, 'static', 'branding', 'logo.png')
    if os.path.exists(logo_path):
        logo = ImageReader(logo_path)
        logo_width = 4 * cm
        logo_height = 4 * cm
        p.drawImage(logo, (width - logo_width) / 2, height - logo_height - 1 * cm, width=logo_width, height=logo_height, preserveAspectRatio=True)

    # === Watermark ===
    p.saveState()
    p.setFont("Helvetica", 60)
    p.setFillGray(0.9, 0.3)
    p.translate(width / 3, height / 2)
    p.rotate(45)
    p.drawCentredString(0, 0, "DealerADO")
    p.restoreState()

    y = height - 5.5 * cm

    # === Heading ===
    p.setFont("Helvetica-Bold", 18)
    p.drawCentredString(width / 2, y, f"Service Report: {service_name}")
    y -= 1.2 * cm

    # === Info section ===
    p.setFont("Helvetica", 10)
    p.drawString(2 * cm, y, f"Generated for: {user.get_full_name() or user.username}")
    y -= 0.6 * cm
    p.drawString(2 * cm, y, f"Generated on: {now().strftime('%Y-%m-%d %H:%M:%S')}")
    y -= 1 * cm

    # === Data Table ===
    p.setFont("Helvetica", 11)
    y = render_data_recursive(p, response_data, x=2 * cm, y=y, indent=0, page_height=height)

    # === Footer ===
    p.setFont("Helvetica-Oblique", 8)
    p.setFillColorRGB(0.4, 0.4, 0.4)
    p.drawCentredString(width / 2, 1.5 * cm, "This is a system-generated PDF by DealerADO. Unauthorized distribution prohibited.")

    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer


def build_absolute_pdf_url(pdf_path: str) -> str:
    # Use Django's storage backend to get full URL
    url = default_storage.url(pdf_path)

    # If S3, url is already absolute
    if settings.ENVIRONMENT == "production":
        return url

    # Else (local dev), return with full domain
    domain = getattr(settings, "DOMAIN", "http://127.0.0.1:8000")
    if not url.startswith("/"):
        url = "/" + url
    return f"{domain}{url}"