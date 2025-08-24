from django.contrib import admin
from unfold.sites import UnfoldAdminSite
from utility.admin_dashboard import get_admin_dashboard_context


class MyAdminSite(UnfoldAdminSite):
    site_header = "DealerADO Admin"
    site_title = "DealerADO Admin"
    index_title = "Dashboard"
    index_template = "admin/index.html"

    def index(self, request, extra_context=None):
        extra = get_admin_dashboard_context()
        print(extra)
        merged = {**(extra_context or {}), **extra}
        return super().index(request, extra_context=merged)


my_admin_site = MyAdminSite(name="myadmin")

# copy over existing registrations from the default admin site
for model, model_admin in admin.site._registry.items():
    my_admin_site.register(model, model_admin.__class__)