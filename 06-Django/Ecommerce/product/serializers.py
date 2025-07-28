from rest_framework import serializers
from .models import Category, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','description']

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
    category = CategorySerializer()
    # category = serializers.StringRelatedField(read_only = True)
    # category_id = serializers.PrimaryKeyRelatedField(source = "category", read_only = True)
    images = ProductImageSerializer(many=True, read_only = True)
    
    class Meta:
        model = Product
        fields = ['id','name','description','category','category_id','price','discount','image','stock','images','is_active']

class MultipleImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, list):
            return [super().to_internal_value(item) for item in data]
        return [super().to_internal_value(data)]


class ProductSerializerCreate(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset = Category.objects.all())
    images = MultipleImageField(write_only=True, required=False)
    

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

    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])
        print("number of Images in updated",len(images))

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if images is not None and len(images)>0:
            ProductImage.objects.filter(product=instance).delete()

            for index, image in enumerate(images, start=1):
                product_image = ProductImage.objects.create(
                    product=instance, image=image, index=index
                )

                if index == 1:
                    instance.image = product_image.image

        instance.save()
        return instance


    



