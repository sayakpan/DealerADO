from typing import Any, Dict, List, Optional
from .models import Service


def deep_get(obj: Any, path: str):
    cur = obj
    for part in path.split("."):
        if isinstance(cur, list):
            try:
                idx = int(part)
                cur = cur[idx]
            except Exception:
                return None
        else:
            cur = cur.get(part) if isinstance(cur, dict) else None
        if cur is None:
            return None
    return cur


def deep_set(obj: Dict[str, Any], path: str, value: Any):
    parts = path.split(".")
    cur = obj
    for i, part in enumerate(parts):
        last = i == len(parts) - 1
        if last:
            if isinstance(cur, dict):
                cur[part] = value
            else:
                return
        else:
            if isinstance(cur, dict):
                if part not in cur or not isinstance(cur[part], dict):
                    cur[part] = {}
                cur = cur[part]
            else:
                return


def deep_delete(obj: Dict[str, Any], path: str):
    parts = path.split(".")
    cur = obj
    for i, part in enumerate(parts):
        last = i == len(parts) - 1
        if last:
            if isinstance(cur, dict) and part in cur:
                del cur[part]
            return
        else:
            if isinstance(cur, dict):
                cur = cur.get(part)
            else:
                return
        if cur is None:
            return


def coalesce_expr(expr: str, raw: Dict[str, Any]):
    parts = [p.strip() for p in expr.split("||")]
    for p in parts:
        v = deep_get(raw, p) if "." in p else raw.get(p)
        if v not in (None, ""):
            return v
    return None


def normalize(raw: Dict[str, Any], mapping: Dict[str, str]) -> Dict[str, Any]:
    ctx = {}
    for k, expr in mapping.items():
        if isinstance(expr, str) and "||" in expr:
            ctx[k] = coalesce_expr(expr, raw)
        else:
            ctx[k] = deep_get(raw, expr) if isinstance(expr, str) and "." in expr else raw.get(expr)
    return ctx


def fmt_mask(value, args: Dict[str, Any]):
    if not value:
        return value
    s = str(value)
    keep = int(args.get("visible_last", 4))
    char = str(args.get("char", "X"))
    return (char * max(0, len(s) - keep)) + s[-keep:]


def fmt_yes_no(value, args: Dict[str, Any]):
    return "Yes" if bool(value) else "No"


def fmt_currency_inr(value, args: Dict[str, Any]):
    if isinstance(value, (int, float)):
        return f"₹{value:,}"
    return value


FORMATTERS = {
    "mask": fmt_mask,
    "yes_no": fmt_yes_no,
    "currency_inr": fmt_currency_inr
}


def apply_format(value, fmt_name: Optional[str], schema_formatters: Dict[str, Dict[str, Any]]):
    if not fmt_name:
        return value
    fmt_def = schema_formatters.get(fmt_name)
    if not fmt_def:
        return value
    fn = FORMATTERS.get(fmt_def.get("fn"))
    if not fn:
        return value
    return fn(value, fmt_def.get("args", {}))


def apply_security_on_ctx(ctx: Dict[str, Any], spec: Dict[str, Any]):
    sec = spec.get("security") or {}
    schema_formatters = spec.get("formatters", {})

    # Masking: modify values in normalized context
    for rule in sec.get("mask", []):
        path = rule.get("path")
        fmt_name = rule.get("format")
        if not path:
            continue
        current = deep_get(ctx, path) if "." in path else ctx.get(path)
        if current is None:
            continue
        if fmt_name:
            fmt_def = schema_formatters.get(fmt_name)
            if fmt_def:
                fn = FORMATTERS.get(fmt_def.get("fn"))
                if fn:
                    masked = fn(current, fmt_def.get("args", {}))
                    if "." in path:
                        deep_set(ctx, path, masked)
                    else:
                        ctx[path] = masked

    # Redaction: remove keys entirely from normalized context
    for path in sec.get("redact", []):
        if "." in path:
            deep_delete(ctx, path)
        else:
            if path in ctx:
                del ctx[path]


def resolve_item(item: Dict[str, Any], ctx: Dict[str, Any], schema_formatters: Dict[str, Dict[str, Any]]):
    t = item.get("type")
    if t in ("text", "kv"):
        src = item.get("source")
        val = ctx.get(src)
        val = apply_format(val, item.get("format"), schema_formatters)
        out = dict(item)
        out["value"] = val
        return out
    if t == "address":
        src = item.get("source")
        val = ctx.get(src) or {}
        out = dict(item)
        out["value"] = val
        return out
    if t == "table":
        src = item.get("source")
        rows = ctx.get(src) or []
        out = dict(item)
        out["rows"] = rows
        return out
    return dict(item)


def build_ast_from_ctx(spec: Dict[str, Any], ctx: Dict[str, Any]) -> Dict[str, Any]:
    schema_formatters = spec.get("formatters", {}) or {}

    header = spec.get("header", {}) or {}
    ast_header = {}
    if "left" in header:
        ast_header["left"] = resolve_item(header["left"], ctx, schema_formatters)
    if "right" in header:
        ast_header["right"] = resolve_item(header["right"], ctx, schema_formatters)

    ast_sections: List[Dict[str, Any]] = []
    for sec in spec.get("sections", []):
        items = [resolve_item(it, ctx, schema_formatters) for it in sec.get("items", [])]
        ast_sections.append({"title": sec.get("title"), "items": items})

    return {
        "service": spec.get("service"),
        "header": ast_header,
        "sections": ast_sections
    }


def render_response_with_schema(service: Service, raw_payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Returns a renderer-agnostic AST built from the service's schema and a raw API payload.
    Use this in both 'submit_service_form' response and 'RenderFromLogAPIView'.
    """
    schema = getattr(service, "schema", None)
    if not schema or not schema.spec:
        raise ValueError("Schema not configured for this service.")

    spec = dict(schema.spec)
    if not spec.get("service"):
        spec["service"] = service.slug

    ctx = normalize(raw_payload, spec.get("map", {}))
    apply_security_on_ctx(ctx, spec)
    ast = build_ast_from_ctx(spec, ctx)

    return ast