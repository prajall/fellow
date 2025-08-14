from django.contrib import admin
from .models import DebtModel

# Register your models here.
@admin.register(DebtModel)
class DebtAdmin(admin.ModelAdmin):
    list_display = ('user_a', 'user_b', 'amount', 'group_id', 'created_at', 'updated_at')
    list_filter = ('group_id', 'created_at', 'updated_at')
    search_fields = ('user_a__name', 'user_b__name')
