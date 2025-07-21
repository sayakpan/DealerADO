from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'mobile_number', 'role')
    search_fields = ('user__username', 'user__email', 'mobile_number')
    list_filter = ('role',)
    autocomplete_fields = ['user'] 