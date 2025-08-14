from django.contrib import admin
from .models import ExpenseModel, ExpenseParticipant

# Register your models here.
@admin.register(ExpenseModel)
class ExpenseModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'group_id', 'total_amount', 'created_at', 'updated_at')
    list_filter = ('group_id', 'created_at', 'updated_at')
    search_fields = ('title',)

@admin.register(ExpenseParticipant)
class ExpenseParticipantAdmin(admin.ModelAdmin):
    list_display = ('expense_id', 'user_id', 'paid_amount', 'allocated_amount', 'created_at', 'updated_at')
    list_filter = ('expense_id', 'created_at', 'updated_at')
    search_fields = ('expense_id__title', 'user_id__name')
