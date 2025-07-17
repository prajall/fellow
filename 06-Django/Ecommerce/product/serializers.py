from rest_framework import serializers
from .models import Category, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"

class ProductSerializerDetail(serializers.ModelSerializer):
    category = CategorySerializer()
    images = ProductImageSerializer(many=True, read_only = True)

    class Meta:
        model = Product
        fields = "__all__"

class ProductSerializerBasic(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only = True)
    category_id = serializers.PrimaryKeyRelatedField(source = "category", read_only = True)
    
    class Meta:
        model = Product
        fields = ['id','name','description','category','category_id','price','discount','image','stock']


class ProductSerializerCreate(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset = Category.objects.all())
    images = serializers.ListField(
        child = serializers.ImageField(),
        write_only = True,
        required = False
    )
    

    class Meta:
        model= Product
        fields = ['id','name','description','category','stock','discount','is_active','images','image','price']

    
    def create(self, validated_data):
        images = validated_data.pop('images',[])
        image = images[0] if images else None
        product = Product.objects.create(**validated_data, image = image)

        for index, image in enumerate(images, start=1):  
            product_image = ProductImage.objects.create(product = product, image = image, index = index)

            if index==1:
                product.image = product_image.image

        product.save()
        return product

    



