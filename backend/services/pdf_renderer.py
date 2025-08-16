from io import BytesIO
import os
from django.conf import settings
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib.utils import ImageReader


def _fmt_value(v):
    if v is True:
        return "Yes"
    if v is False:
        return "No"
    if v is None:
        return "Not Available"
    if isinstance(v, str):
        s = v.strip()
        return s if s else "Not Available"
    return str(v)


def _draw_wrapped_text(p, x, y, text, width, font_name="Helvetica", font_size=11, leading=14):
    if text is None:
        text = "Not Available"
    text = _fmt_value(text)
    p.setFont(font_name, font_size)
    words = str(text).split()
    line = []
    space_w = p.stringWidth(" ", font_name, font_size)
    cur_w = 0
    yy = y
    for w in words:
        ww = p.stringWidth(w, font_name, font_size)
        if cur_w + ww + (space_w if line else 0) > width:
            p.drawString(x, yy, " ".join(line))
            yy -= leading
            line = [w]
            cur_w = ww
        else:
            if line:
                cur_w += space_w + ww
                line.append(w)
            else:
                cur_w = ww
                line = [w]
    if line:
        p.drawString(x, yy, " ".join(line))
        yy -= leading
    return yy


def _draw_kv(p, x, y, label, value, label_w=3*cm, width=16*cm, font_size=11, leading=14, pad=6):
    # Measure the actual label width and ensure value starts after it (plus pad)
    p.setFont("Helvetica-Bold", font_size)
    label_txt = f"{label}:"
    p.drawString(x, y, label_txt)

    measured = p.stringWidth(label_txt, "Helvetica-Bold", font_size)
    value_x = x + max(label_w, measured + pad)

    p.setFont("Helvetica", font_size)
    return _draw_wrapped_text(p, value_x, y, _fmt_value(value), width - (value_x - x), "Helvetica", font_size, leading)


# def _draw_table(p, x, y, columns, rows, max_width=18*cm, font_size=10):
#     styles = getSampleStyleSheet()
#     cell_style = ParagraphStyle(
#         "cell",
#         parent=styles["BodyText"],
#         fontName="Helvetica",
#         fontSize=font_size,
#         leading=font_size + 3,
#     )
#     header_style = ParagraphStyle(
#         "header",
#         parent=styles["BodyText"],
#         fontName="Helvetica-Bold",
#         fontSize=font_size + 0.5,
#         leading=font_size + 3,
#     )

#     col_keys = [c["key"] for c in columns]
#     col_titles = [c.get("title") or c["key"] for c in columns]
#     num_cols = max(1, len(columns))
#     col_widths = [max_width / num_cols] * num_cols

#     data = [[Paragraph(str(t), header_style) for t in col_titles]]
#     for row in rows:
#         data.append([Paragraph(_fmt_value(row.get(k)), cell_style) for k in col_keys])

#     tbl = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
#     ts = TableStyle([
#         ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F2F2F5")),
#         ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
#         ("LINEABOVE", (0, 0), (-1, 0), 0.6, colors.grey),
#         ("LINEBELOW", (0, 0), (-1, 0), 0.6, colors.grey),
#         ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#DDDEE3")),
#         ("BOX", (0, 0), (-1, -1), 0.25, colors.HexColor("#DDDEE3")),
#         ("VALIGN", (0, 0), (-1, -1), "TOP"),
#         ("LEFTPADDING", (0, 0), (-1, -1), 6),
#         ("RIGHTPADDING", (0, 0), (-1, -1), 6),
#         ("TOPPADDING", (0, 0), (-1, -1), 5),
#         ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
#     ])

#     # Alternate row shading (skip header row)
#     for r in range(1, len(data)):
#         if r % 2 == 0:
#             ts.add("BACKGROUND", (0, r), (-1, r), colors.whitesmoke)

#     # Align numeric columns right
#     for ci, key in enumerate(col_keys):
#         numeric = True
#         for r in rows:
#             v = r.get(key)
#             if isinstance(v, bool) or v is None:
#                 continue
#             if not isinstance(v, (int, float)):
#                 numeric = False
#                 break
#         if numeric:
#             ts.add("ALIGN", (ci, 1), (ci, -1), "RIGHT")

#     tbl.setStyle(ts)

#     # Pagination-aware drawing
#     tw, th = tbl.wrapOn(p, max_width, 0)
#     bottom_y = y - th
#     page_w, page_h = A4
#     bottom_margin = 3 * cm
#     if bottom_y < bottom_margin:
#         p.showPage()
#         y = page_h - 2 * cm
#         bottom_y = y - th

#     tbl.drawOn(p, x, bottom_y)
#     return bottom_y - 0.2 * cm

PALETTE = {
    "header_bg": colors.HexColor("#111827"),
    "header_text": colors.white,
    "row_alt": colors.Color(0.985, 0.987, 0.99),
    "grid": colors.HexColor("#D5D5D5"),
}

def _fmt_cell_html(v):
    s = _fmt_value(v)
    if s == "Yes":
        return '<font color="#16a34a"><b>Yes</b></font>'
    if s == "No":
        return '<font color="#dc2626"><b>No</b></font>'
    if s == "Not Available":
        return '<font color="#6b7280">Not Available</font>'
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def _draw_table(p, x, y, columns, rows, max_width=18*cm, font_size=10):
    styles = getSampleStyleSheet()
    cell_style = ParagraphStyle(
        "cell",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=font_size,
        leading=font_size + 3,
        spaceAfter=0,
        spaceBefore=0,
    )
    header_style = ParagraphStyle(
        "header",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=font_size + 0.5,
        leading=font_size + 4,
        textColor=PALETTE["header_text"],
        spaceAfter=0,
        spaceBefore=0,
    )

    col_keys = [c["key"] for c in columns]
    col_titles = [c.get("title") or c["key"] for c in columns]
    num_cols = max(1, len(columns))

    if any(isinstance(c.get("width"), (int, float)) for c in columns):
        raw = [float(c.get("width", 0)) for c in columns]
        s = sum(raw) or 1.0
        col_widths = [max_width * (w / s) if w > 0 else max_width / num_cols for w in raw]
    else:
        col_widths = [max_width / num_cols] * num_cols

    data = [[Paragraph(str(t), header_style) for t in col_titles]]
    for row in rows:
        data.append([Paragraph(_fmt_cell_html(row.get(k)), cell_style) for k in col_keys])

    tbl = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    ts = TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["header_bg"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), PALETTE["header_text"]),
        ("LINEABOVE", (0, 0), (-1, 0), 0.6, PALETTE["header_bg"]),
        ("LINEBELOW", (0, 0), (-1, 0), 0.6, PALETTE["header_bg"]),
        ("INNERGRID", (0, 1), (-1, -1), 0.25, PALETTE["grid"]),
        ("BOX", (0, 0), (-1, -1), 0.4, PALETTE["grid"]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ])

    for r in range(1, len(data)):
        if r % 2 == 0:
            ts.add("BACKGROUND", (0, r), (-1, r), PALETTE["row_alt"])

    for ci, col in enumerate(columns):
        align = (col.get("align") or "").lower()
        if align in ("left", "center", "right"):
            ts.add("ALIGN", (ci, 1), (ci, -1), align.upper())
        else:
            numeric = True
            for r in rows:
                v = r.get(col["key"])
                if isinstance(v, bool) or v is None:
                    continue
                if not isinstance(v, (int, float)):
                    numeric = False
                    break
            if numeric:
                ts.add("ALIGN", (ci, 1), (ci, -1), "RIGHT")

    tbl.setStyle(ts)

    tw, th = tbl.wrapOn(p, max_width, 0)
    bottom_y = y - th
    page_w, page_h = A4
    bottom_margin = 3 * cm
    if bottom_y < bottom_margin:
        p.showPage()
        y = page_h - 2 * cm
        bottom_y = y - th

    tbl.drawOn(p, x, bottom_y)
    return bottom_y - 0.25 * cm



def _draw_logo_top_left(p, x_left, y_top, max_width_cm=3.0, max_height_cm=1.5):
    logo_path = os.path.join(settings.BASE_DIR, "static", "branding", "logo.png")
    if not os.path.exists(logo_path):
        return y_top
    try:
        img = ImageReader(logo_path)
        iw, ih = img.getSize()
        max_w = max_width_cm * cm
        max_h = max_height_cm * cm
        scale = min(max_w / iw, max_h / ih)
        w = iw * scale
        h = ih * scale
        # drawImage places bottom-left at (x, y). We want the logo to sit below the top baseline.
        p.drawImage(img, x_left, y_top - h, width=w, height=h, preserveAspectRatio=True, mask='auto')
        return y_top - h - (1.5 * cm)  # small gap below logo
    except Exception:
        return y_top
    
    
def _draw_watermark(p, page_w, page_h):
#     p.saveState()
#     p.setFillColorRGB(0.85, 0.85, 0.85)  # light grey
#     p.setFont("Helvetica-Bold", 50)
#     p.translate(page_w / 2, page_h / 2)
#     p.rotate(45)
#     p.drawCentredString(0, 0, "DealerADO")
#     p.restoreState()
    
    logo_path = os.path.join(settings.BASE_DIR, "static", "branding", "logo.png")
    if not os.path.exists(logo_path):
        return
    from PIL import Image, ImageEnhance
    img_pil = Image.open(logo_path).convert("RGBA")  # Keep alpha channel
    
    # Convert to grayscale (L), then back to RGBA
    img_gray = img_pil.convert("L").convert("RGBA")
    
    # Reduce opacity
    alpha = img_gray.split()[3]  # Get the alpha channel
    alpha = ImageEnhance.Brightness(alpha).enhance(0.3)  # 0.0 = fully transparent, 1.0 = full opacity
    img_gray.putalpha(alpha)
    img = ImageReader(img_gray)
    iw, ih = img.getSize()
    max_size = 8 * cm
    scale = min(max_size / iw, max_size / ih)
    w = iw * scale
    h = ih * scale

    p.saveState()
    p.translate(page_w / 2, page_h / 2)
    p.rotate(30)
    p.drawImage(img, -w/2, -h/2, width=w, height=h, mask='auto')
    p.restoreState()


def render_ast_to_pdf(service_title: str, ast: dict, user_label: str = "") -> bytes:
    buf = BytesIO()
    p = canvas.Canvas(buf, pagesize=A4)
    page_w, page_h = A4
    
    _draw_watermark(p, page_w, page_h)

    x_margin = 2 * cm
    y = page_h - 2 * cm

    # Logo top-left
    y = _draw_logo_top_left(p, x_margin, y)

    # Title on same line height (to the right of logo top area) – simplest: draw below logo
    p.setFont("Helvetica-Bold", 16)
    p.drawString(x_margin, y, service_title)
    if user_label:
        p.setFont("Helvetica", 10)
        p.drawRightString(page_w - x_margin, y, user_label)
    y -= 0.8 * cm

    # Header left/right
    header = ast.get("header", {})
    left = header.get("left", {})
    right = header.get("right", {})

    if left:
        label = left.get("label") or ""
        value = left.get("value")
        p.setFont("Helvetica-Bold", 12 if left.get("bold") else 11)
        y = _draw_kv(p, x_margin, y, label, value, label_w=2.8 * cm, width=17 * cm)
    if right:
        label = right.get("label") or ""
        value = right.get("value")
        p.setFont("Helvetica-Bold", 11)
        p.drawRightString(page_w - x_margin, y + 14, f"{label}: {_fmt_value(value)}")

    # Divider
    y -= 0.2 * cm
    p.setStrokeColor(colors.lightgrey)
    p.line(x_margin, y, page_w - x_margin, y)
    y -= 1 * cm

    # Sections
    for section in ast.get("sections", []):
        title = section.get("title") or ""
        if title:
            p.setFont("Helvetica-Bold", 14)
            p.drawString(x_margin, y, title)
            y -= 0.8 * cm

        for item in section.get("items", []):
            t = item.get("type")
            if t in ("kv", "text"):
                label = item.get("label") or ""
                value = item.get("value")
                y = _draw_kv(p, x_margin, y, label, value, label_w=5 * cm, width=30 * cm)
                y -= 0.12 * cm
            elif t == "address":
                addr = item.get("value") or {}
                parts = [addr.get(k) for k in ["line_1", "line_2", "street", "city", "state", "pincode", "zip", "country"]]
                parts = [str(v) for v in parts if v not in (None, "", [])]
                comp = ", ".join(parts) if parts else "Not Available"
                y = _draw_kv(p, x_margin, y, "Address", comp, label_w=3.2 * cm, width=17 * cm)
                y -= 0.12 * cm
            elif t == "table":
                cols = item.get("columns") or []
                rows = item.get("rows") or []
                
                if rows:
                    y = _draw_table(p, x_margin, y, cols, rows, max_width=17 * cm)
                else:
                    col_keys = [c.get("key") for c in cols]
                    placeholder = {k: "Not Available" for k in col_keys}
                    rows = [placeholder]
                    y = _draw_table(p, x_margin, y, cols, rows, max_width=17 * cm)

            if y < 3 * cm:
                p.showPage()
                y = page_h - 2 * cm

        # small gap between sections
        y -= 0.35 * cm
        if section != ast["sections"][-1]:
            p.setStrokeColor(colors.lightgrey)
            p.setLineWidth(0.5)
            p.line(x_margin, y, page_w - x_margin, y)
            y -= 0.95 * cm

    p.showPage()
    _draw_watermark(p, page_w, page_h)
    p.save()
    return buf.getvalue()