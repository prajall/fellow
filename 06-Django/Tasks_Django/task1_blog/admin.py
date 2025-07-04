from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Author)
class authorAdminView(admin.ModelAdmin):
    list_display = ['name','email','bio']

@admin.register(models.Category)
class authorAdminView(admin.ModelAdmin):
    list_display = ['category']

@admin.register(models.Post)
class authorAdminView(admin.ModelAdmin):
    list_display = ['title','author','category']
    list_filter = ["title",'author','category']
    search_fields = ['title','author','content']
    
    