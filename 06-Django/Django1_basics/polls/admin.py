from django.contrib import admin
from .models import Question, Choice

# Register your models here.

class QnDisplay(admin.ModelAdmin):
    list_display=['question_text','pub_date']

admin.site.register(Question,QnDisplay)
admin.site.register(Choice)