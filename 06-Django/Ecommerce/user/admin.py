from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User
from django.utils.translation import gettext_lazy as _

admin.site.register(User)

# @admin.register(User)
# class UserAdmin(BaseUserAdmin):
#     ordering = ['email']
#     list_display = ['email', 'name', 'role', 'is_staff']
#     search_fields = ['email', 'name']
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         (_('Personal info'), {'fields': ('name', 'role')}),
#         (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         (_('Important dates'), {'fields': ('last_login',)}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'name', 'role', 'password1', 'password2', 'is_staff', 'is_superuser'),
#         }),
#     )
#     filter_horizontal = ('groups', 'user_permissions')

