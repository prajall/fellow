from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializerDetail(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = "__all__"

class ProductSerializerBasic(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only = True)
    category_id = serializers.PrimaryKeyRelatedField(source = "category", read_only = True)
    
    class Meta:
        model = Product
        fields = ['id','name','description','category','category_id','price','discount','image']

class ProductSerializerCreate(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset = Category.objects.all())

    class Meta:
        model= Product
        fields="__all__"


