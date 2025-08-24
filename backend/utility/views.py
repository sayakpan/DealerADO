# utilities/views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from .models import Banner
from .serializers import BannerSerializer

from django.shortcuts import render
from .admin_dashboard import get_admin_dashboard_context


class BannerDetailView(APIView):
    def get(self, request, slug):
        banner = get_object_or_404(Banner, slug=slug)
        serializer = BannerSerializer(banner, context={'request': request})
        return Response(serializer.data)


# def admin_index(request):
#     ctx = get_admin_dashboard_context()
#     print(ctx)
#     return render(request, "admin/index.html", ctx)