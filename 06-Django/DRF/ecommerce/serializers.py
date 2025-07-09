from rest_framework import serializers
from .models import Brand,Category, Product


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields="__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"

# just get one field in brand and category when populating in product serializer
class BrandNameSerializer(serializers.ModelSerializer):
    class Meta:
        model= Brand
        fields = ['id','name']

class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['id','category']

class ProductSerializer(serializers.ModelSerializer):

    brand = BrandNameSerializer()
    category = CategoryNameSerializer()    

    class Meta:
        model=Product
        fields="__all__"
    
class ProductAddSerializer(serializers.ModelSerializer):
    
     class Meta:
        model=Product
        fields="__all__"
