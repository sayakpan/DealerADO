from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from dealerado.admin_site import my_admin_site

admin.site.site_header = "DealerADO Admin"
admin.site.site_title = "DealerADO Admin Portal"
admin.site.index_title = "Site Administration"

urlpatterns = [
    # path('admin/', admin.site.urls),
    path("admin/", my_admin_site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/services/', include('services.urls')),
    path('api/wallet/', include('wallet.urls')),
    path('api/utility/', include('utility.urls')),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
