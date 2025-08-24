from django.contrib import admin
from unfold.admin import ModelAdmin  # 1. Import ModelAdmin from unfold
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(ModelAdmin): 
    compressed_fields = True
    change_form_show_cancel_button = True
    list_filter_submit = True
    
    list_display = ('user', 'mobile_number', 'role')
    search_fields = ('user__username', 'user__email', 'mobile_number')
    list_filter = ('role',)
    # autocomplete_fields = ['user']
    readonly_fields = ('user',)
    fields = ('user', 'mobile_number', 'role')