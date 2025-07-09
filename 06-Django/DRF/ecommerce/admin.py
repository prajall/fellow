from django.contrib import admin
from .models import Product
from .models import Brand
from .models import Category

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=['name','category','price']

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display=['name']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display=['category']


    