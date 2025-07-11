from rest_framework import serializers
from .models import Brand, Category, Product

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields = "__all__"

class Category(serializers.ModelCategory):
    class Meta:
        model=Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):

    brand = serializers.StringRelatedField()


    class Meta:
        model = Product
        fields = "__all__"
