import os
import re
from io import BytesIO
from curses import raw
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from django.conf import settings
from django.utils.timezone import now
from django.conf import settings
from django.core.files.storage import default_storage
from textwrap import wrap
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

paragraph_style = ParagraphStyle(
    name='TableCell',
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    alignment=TA_LEFT,
    spaceAfter=0,
    spaceBefore=0
)

def is_falsy(value) -> bool:
    return value in (None, "", []) or (isinstance(value, dict) and not value)

def format_value(value):
    if is_falsy(value):
        return "Not Available"
    if isinstance(value, bool) or str(value) == "true" or str(value) == "false":
        return "Yes" if value in (True, "true") else "No"
    return str(value)

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


def draw_bold_key_with_wrapped_value(p, x, y, key, value, max_width, line_height=0.6 * cm):
    from reportlab.platypus import Table, TableStyle, Paragraph
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.enums import TA_LEFT

    paragraph_style_key = ParagraphStyle(
        name='KeyStyle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        alignment=TA_LEFT
    )

    paragraph_style_value = ParagraphStyle(
        name='ValueStyle',
        fontName='Helvetica',
        fontSize=10,
        leading=12,
        alignment=TA_LEFT
    )

    key_para = Paragraph(f"{key}:", paragraph_style_key)
    value_para = Paragraph(format_value(value), paragraph_style_value)

    available_width = max_width
    col_widths = [available_width * 0.3, available_width * 0.7]

    table = Table([[key_para, value_para]], colWidths=col_widths)
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))

    w, h = table.wrapOn(p, available_width, A4[1])
    table.drawOn(p, x, y - h)
    return y - h - 0.4 * cm


def draw_wrapped_string(p, x, y, text, max_chars=100, line_height=0.6 * cm, font_name="Helvetica", font_size=11):
    p.setFont(font_name, font_size)
    lines = wrap(format_value(text), width=max_chars)
    for line in lines:
        p.drawString(x, y, line)
        y -= line_height
    return y


def render_data_recursive(p, data, x, y, indent=0, page_height=A4[1]):
    indent_space = 0.5 * cm * indent
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
        # Check if flat dict (no nested dicts/lists)
        if all(isinstance(v, (str, int, float, bool, type(None))) for v in data.values()):
            table_data = []
            for key, value in data.items():
                pretty_key = prettify_key(key)
                formatted_value = format_value(value)
                table_data.append([
                    Paragraph(pretty_key, paragraph_style),
                    Paragraph(formatted_value, paragraph_style)
                ])

            available_width = A4[0] - 4 * cm
            col_widths = [available_width * 0.4, available_width * 0.6]

            table = Table(table_data, colWidths=col_widths)
            table.setStyle(TableStyle([
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
                ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#999999")),
                ('LEFTPADDING', (0, 0), (-1, -1), 6),
                ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ]))

            w, h = table.wrapOn(p, available_width, A4[1])
            y = check_page_space(p, y)
            table.drawOn(p, 2 * cm, y - h)
            y -= h + 0.5 * cm
            return y
        else:
            # Default recursive rendering for nested dict
            for key, value in data.items():
                y = check_page_space(p, y)
                pretty_key = prettify_key(key)
                if is_falsy(value):
                    y = draw_bold_key_with_wrapped_value(p, x_offset, y, prettify_key(key), "Not Available", max_width=A4[0] - x_offset - 2 * cm)
                    y -= 0.4 * cm
                elif isinstance(value, (str, int, float, bool)) or value is None:
                    y = draw_bold_key_with_wrapped_value( p, x + indent * 1.2 * cm, y, pretty_key, value, max_width=A4[0] - (x + indent * 1.2 * cm) - 2 * cm )
                    y -= 0.4 * cm
                else:
                    p.setFont("Helvetica-Bold", 14)
                    p.drawString(x + indent * 1.2 * cm, y, f"{pretty_key}:")
                    y -= 0.6 * cm
                    y = render_data_recursive(p, value, x, y, indent + 1, page_height)
                    y -= 0.9 * cm

    # === If it's a list ===
    elif isinstance(data, list):
        if len(data) == 0:
            p.setFont("Helvetica", 11)
            p.drawString(x + indent * 1.2 * cm, y, "Not Available")
            y -= 0.5 * cm
            return y
        if all(isinstance(item, (str, int, float, bool)) for item in data):
            p.setFont("Helvetica", 11)
            for idx, item in enumerate(data):
                y = check_page_space(p, y)
                p.drawString(x + indent * 1.2 * cm, y, f"{idx + 1}. {item}")
                y -= 0.5 * cm
            return y
        elif all(isinstance(item, dict) for item in data) and len(data) > 0:
            common_keys = list(data[0].keys())
            if all(isinstance(item, dict) and list(item.keys()) == common_keys and all(isinstance(v, (str, int, float, bool, type(None))) for v in item.values()) for item in data):
                table_data = []

                # Header row
                header = [prettify_key(k) for k in common_keys]
                table_data.append(header)

                # Data rows
                for row in data:
                    row_data = [Paragraph(format_value(row.get(k)), paragraph_style) for k in common_keys]
                    table_data.append(row_data)

                # Define column widths
                available_width = A4[0] - 4 * cm
                col_count = len(common_keys)
                col_widths = [available_width / col_count for _ in range(col_count)]

                # Create and style table
                table = Table(table_data, colWidths=col_widths)
                table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f2f2f2")),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor("#000000")),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                    ('FONTSIZE', (0, 0), (-1, -1), 9),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                    ('TOPPADDING', (0, 0), (-1, -1), 6),
                    ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
                    ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#999999")),
                ]))

                # Wrap the table in a frame to draw directly on canvas
                w, h = table.wrapOn(p, available_width, A4[1])
                y = check_page_space(p, y)
                table.drawOn(p, 2 * cm, y - h)
                y -= h + 0.5 * cm
                return y
        else:
            # Fallback for mixed-type or irregular lists
            for idx, item in enumerate(data):
                y = check_page_space(p, y)
                p.setFont("Helvetica-Bold", 11)
                p.drawString(x + indent * 1.2 * cm, y, f"{idx + 1})")
                y -= 0.5 * cm
                y = render_data_recursive(p, item, x, y, indent + 1, page_height)
                y -= 0.4 * cm
            return y

    # === If it's a simple value ===
    else:
        y = check_page_space(p, y)
        display = "Not Available" if is_falsy(data) else format_value(data)
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
    p.drawCentredString(width / 2, y, f"{service_name}")
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
