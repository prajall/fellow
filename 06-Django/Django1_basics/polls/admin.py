from django.contrib import admin
from .models import Question, Choice

# Register your models here.

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display=['id','question_text','pub_date']
    list_filter=['pub_date','question_text']
    search_fields=["question_text"]
    ordering=["-pub_date"]

@admin.register(Choice)
class ChoiceDisplay(admin.ModelAdmin):
    list_display=['id','choice','question','votes']
    raw_id_fields = ['question']
    list_editable=['question']