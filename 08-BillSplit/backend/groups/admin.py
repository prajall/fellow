from django.contrib import admin
from .models import *

# Register your models here.
# admin.site.register(Group)
# admin.site.register(GroupMember)

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner', 'created_at', 'updated_at')
    # list_filter = ('created_at', 'updated_at')
    # search_fields = ('name',)
    # list_per_page = 10

@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'group', 'member', 'joined', 'joined_date')
    # list_filter = ('created_at', 'updated_at')