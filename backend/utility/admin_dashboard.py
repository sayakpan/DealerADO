# admin_dashboard.py

from decimal import Decimal
from datetime import timedelta
from django.db import models
from django.db.models import Q, Sum
from django.db.models.functions import Abs
from django.utils import timezone
from wallet.models import TransactionLog
from services.models import ServiceUsageLog
from calendar import monthrange
from datetime import date
from django.db.models import Count, Sum, Case, When, IntegerField
from django.db.models import Count, Sum, Case, When, IntegerField
from django.db.models.functions import TruncDate, Abs


def get_success_failed_last_14_days():
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=13)

    daily_stats = []

    for i in range(14):
        day = start_date + timedelta(days=i)
        next_day = day + timedelta(days=1)

        qs = ServiceUsageLog.objects.filter(
            created_at__gte=day, created_at__lt=next_day
        )

        success_count = qs.filter(status="success").count()
        failed_count = qs.filter(status="failed").count()

        daily_stats.append({
            "date": day,
            "success": success_count,
            "failed": failed_count,
        })

    labels = [x["date"].strftime("%a") for x in daily_stats]
    success_values = [x["success"] for x in daily_stats]
    failed_values = [x["failed"] for x in daily_stats]

    return {
        "labels": labels,
        "success": success_values,
        "failed": failed_values,
    }


def get_active_users_last_14_days():
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=13)

    daily_active = []
    global_active_users = set()  # to track uniques across 14 days

    for i in range(14):
        day = start_date + timedelta(days=i)
        next_day = day + timedelta(days=1)

        usage_users = ServiceUsageLog.objects.filter(
            created_at__gte=day, created_at__lt=next_day,
            user__isnull=False
        ).values_list("user_id", flat=True)

        txn_users = TransactionLog.objects.filter(
            timestamp__gte=day, timestamp__lt=next_day,
            wallet__user__isnull=False
        ).values_list("wallet__user_id", flat=True)

        active_user_ids = set(usage_users).union(set(txn_users))

        # add to global set
        global_active_users.update(active_user_ids)

        daily_active.append({
            "date": day,
            "count": len(active_user_ids)
        })

    labels = [x["date"].strftime("%a") for x in daily_active]
    values = [x["count"] for x in daily_active]

    return {
        "labels": labels,
        "values": values,
        "total": len(global_active_users)  # unique across the 14 days
    }
    
    
def _last_14_days_revenue():
    today = timezone.now().date()
    start = today - timedelta(days=13)

    qs = (
        ServiceUsageLog.objects.filter(created_at__date__gte=start)
        .values("created_at__date")
        .annotate(total=Sum("price_at_time"))
    )
    totals = {row["created_at__date"]: row["total"] or 0 for row in qs}

    labels, values = [], []
    total_sum = 0
    for i in range(14):
        day = start + timedelta(days=i)
        labels.append(day.strftime("%a"))  # e.g. Mon, Tue
        val = float(totals.get(day, 0))
        values.append(val)
        total_sum += val

    return {"labels": labels, "values": values, "total": total_sum}
    
    
def _days_last_n_desc(n: int, end_dt):
    base = timezone.localtime(end_dt).date()
    return [base - timedelta(days=i) for i in range(n)]  # latest first


def _build_service_heatmap(cur_start, cur_end, *, top_n: int = 9, sort_by: str = "hits") -> dict:
    base = ServiceUsageLog.objects.filter(created_at__gte=cur_start, created_at__lt=cur_end)

    ranked = (
        base.values("service_id", "service__name")
            .annotate(
                total_hits=Count("id"),
                total_revenue=Sum(Abs("wallet_transaction__amount_change")),
            )
    )

    if sort_by == "revenue":
        ranked = ranked.order_by(models.F("total_revenue").desc(nulls_last=True), models.F("total_hits").desc())
    else:
        ranked = ranked.order_by(models.F("total_hits").desc(), models.F("total_revenue").desc(nulls_last=True))

    top = list(ranked[:top_n])
    service_ids = [r["service_id"] for r in top]
    name_by_id = {r["service_id"]: r["service__name"] for r in top}
    hits_total_by_id = {r["service_id"]: int(r["total_hits"] or 0) for r in top}
    revenue_total_by_id = {r["service_id"]: r["total_revenue"] or Decimal("0") for r in top}

    day_service = (
        base.filter(service_id__in=service_ids)
            .annotate(day=TruncDate("created_at"))
            .values("day", "service_id")
            .annotate(
                hits=Count("id"),
                success_hits=Sum(
                    Case(When(status="success", then=1), default=0, output_field=IntegerField())
                ),
                revenue=Sum(Abs("wallet_transaction__amount_change")),
            )
    )

    cell = {}
    for row in day_service:
        d = row["day"]
        sid = row["service_id"]
        hits = int(row["hits"] or 0)
        succ = int(row["success_hits"] or 0)
        rate = float(succ) / float(hits) * 100.0 if hits else 0.0
        cell[(d, sid)] = {
            "hits": hits,
            "success_rate": round(rate, 2),
            "revenue": row["revenue"] or Decimal("0"),
        }

    days = _days_last_n_desc(7, cur_end)  # latest first
    rows = []
    for d in days:
        total_hits_for_day = sum(cell.get((d, sid), {}).get("hits", 0) for sid in service_ids)
        total_revenue_for_day = sum(cell.get((d, sid), {}).get("revenue", Decimal("0")) for sid in service_ids)
        rows.append({
            "date": d,
            "total": total_hits_for_day,
            "revenue": total_revenue_for_day,
            "cells": [
                {
                    "service_id": sid,
                    "hits": cell.get((d, sid), {}).get("hits", 0),
                    "success_rate": cell.get((d, sid), {}).get("success_rate", 0.0),
                    "revenue": cell.get((d, sid), {}).get("revenue", Decimal("0")),
                }
                for sid in service_ids
            ],
        })

    headers = [
        {
            "service_id": sid,
            "name": name_by_id[sid],
            "total_hits": hits_total_by_id[sid],
            "total_revenue": revenue_total_by_id[sid],
        }
        for sid in service_ids
    ]

    return {"headers": headers, "rows": rows}


def _month_window(dt=None, offset_months: int = 0):
    dt = dt or timezone.now()
    # move by months
    year = dt.year + ((dt.month - 1 + offset_months) // 12)
    month = ((dt.month - 1 + offset_months) % 12) + 1
    start = timezone.make_aware(timezone.datetime(year, month, 1))
    end_day = monthrange(year, month)[1]
    end = timezone.make_aware(timezone.datetime(year, month, end_day, 23, 59, 59, 999999))
    return start, end


def _trending_services_last_month(top_n: int = 10):
    # cur_start, cur_end = _month_window(offset_months=0)     # this month
    # prev_start, prev_end = _month_window(offset_months=-1)  # previous month

    # If you want “last 30 days vs the 30 days before”, replace the two windows with:
    cur_end = timezone.now()
    cur_start = cur_end - timedelta(days=30)
    prev_end = cur_start
    prev_start = prev_end - timedelta(days=30)

    cur_qs = ServiceUsageLog.objects.filter(created_at__gte=cur_start, created_at__lte=cur_end)
    prev_qs = ServiceUsageLog.objects.filter(created_at__gte=prev_start, created_at__lte=prev_end)

    cur_by_service = (
        cur_qs.values("service_id", "service__name")
        .annotate(revenue=Sum(Abs("wallet_transaction__amount_change")))
        .order_by(models.F("revenue").desc(nulls_last=True))
    )

    prev_by_service = {
        row["service_id"]: (row["revenue"] or Decimal("0"))
        for row in (
            prev_qs.values("service_id")
            .annotate(revenue=Sum(Abs("wallet_transaction__amount_change")))
        )
    }

    items = []
    total_cur = Decimal("0")
    max_rev = Decimal("0")

    for row in cur_by_service[:top_n]:
        name = row["service__name"]
        sid = row["service_id"]
        rev = row["revenue"] or Decimal("0")
        prev_rev = prev_by_service.get(sid, Decimal("0"))
        change = _pct_change(rev, prev_rev)

        items.append({
            "service_id": sid,
            "name": name,
            "revenue": rev,
            "prev_revenue": prev_rev,
            "change_pct": change,
        })
        total_cur += rev
        if rev > max_rev:
            max_rev = rev

    total_prev = sum(prev_by_service.get(it["service_id"], Decimal("0")) for it in items)  # compare same set
    total_change = _pct_change(total_cur, total_prev)

    # bar widths (0–100)
    for it in items:
        it["bar_pct"] = float(it["revenue"] / max_rev * 100) if max_rev else 0.0

    return {
        "period": {
            "label": f"{cur_start.strftime('%-d %b')} – {cur_end.strftime('%-d %b')}",
            "compare_label": f"{prev_start.strftime('%-d %b')} – {prev_end.strftime('%-d %b')}",
            "start": cur_start, "end": cur_end,
            "prev_start": prev_start, "prev_end": prev_end,
        },
        "total": {
            "current": total_cur,
            "previous": total_prev,
            "trend_pct": total_change,
        },
        "items": items,
    }
    

def _sum_abs_amount(qs):
    return qs.aggregate(total=Sum(Abs("amount_change")))["total"] or Decimal("0")


def _pct_change(current: Decimal | float, previous: Decimal | float) -> float:
    previous = float(previous)
    current = float(current)
    if previous == 0:
        return 100.0 if current > 0 else 0.0
    return ((current - previous) / previous) * 100.0


def _week_window(offset_days: int = 0):
    now = timezone.now()
    end = now - timedelta(days=offset_days)
    start = end - timedelta(days=7)
    return start, end


def get_admin_dashboard_context():
    print("Getting admin dashboard context")
    cur_start, cur_end = _week_window(0)
    prev_start, prev_end = _week_window(7)

    debit_filter = Q(transaction_type="debit", is_reversed=False)
    credit_filter = Q(transaction_type="recharge", is_reversed=False)

    cur_debits = TransactionLog.objects.filter(debit_filter, timestamp__gte=cur_start, timestamp__lt=cur_end)
    prev_debits = TransactionLog.objects.filter(debit_filter, timestamp__gte=prev_start, timestamp__lt=prev_end)

    usage_last7 = _sum_abs_amount(cur_debits)
    usage_prev7 = _sum_abs_amount(prev_debits)
    usage_trend = _pct_change(usage_last7, usage_prev7)

    cur_logs = ServiceUsageLog.objects.filter(created_at__gte=cur_start, created_at__lt=cur_end)
    prev_logs = ServiceUsageLog.objects.filter(created_at__gte=prev_start, created_at__lt=prev_end)

    cur_total_logs = cur_logs.count()
    cur_success_logs = cur_logs.filter(status="success").count()
    prev_total_logs = prev_logs.count()
    prev_success_logs = prev_logs.filter(status="success").count()

    cur_success_rate = (cur_success_logs / cur_total_logs * 100.0) if cur_total_logs else 0.0
    prev_success_rate = (prev_success_logs / prev_total_logs * 100.0) if prev_total_logs else 0.0
    success_trend = _pct_change(cur_success_rate, prev_success_rate)

    total_credit_now = _sum_abs_amount(TransactionLog.objects.filter(credit_filter))
    total_credit_prevweek_cutoff = _sum_abs_amount(
        TransactionLog.objects.filter(credit_filter, timestamp__lt=cur_start)
    )
    credit_trend = _pct_change(total_credit_now, total_credit_prevweek_cutoff)
    
    heatmap = _build_service_heatmap(cur_start, cur_end)
    trending = _trending_services_last_month(top_n=8)
    last_14_days_revenue = _last_14_days_revenue()
    last_14_days_active_users = get_active_users_last_14_days()
    last_14_days_success_failed = get_success_failed_last_14_days()

    return {
        "stats": {
            "usage_last_7_days": {
                "value": usage_last7,
                "previous": usage_prev7,
                "trend_pct": usage_trend,
            },
            "success_rate_last_7_days": {
                "value": round(cur_success_rate, 2),
                "previous": round(prev_success_rate, 2),
                "trend_pct": success_trend,
            },
            "total_credit": {
                "value": total_credit_now,
                "previous": total_credit_prevweek_cutoff,
                "trend_pct": credit_trend,
            },
        },
        "windows": {
            "current": {"start": cur_start, "end": cur_end},
            "previous": {"start": prev_start, "end": prev_end},
        },
        "service_heatmap": heatmap,
        "trending": trending,
        "revenue_last_14_days": last_14_days_revenue,
        "active_users_last_14_days": last_14_days_active_users,
        "success_failed_last_14_days": last_14_days_success_failed,
    }