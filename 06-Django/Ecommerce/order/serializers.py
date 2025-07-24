from rest_framework import serializers
from .models import *
from product.serializers import *
from user.serializers import *
from user.models import User
from product.models import Product

class OrderSerializer(serializers.ModelSerializer):

    customer = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset = Product.objects.all())
        
    class Meta:
        model = Order
        fields = "__all__"

class ProductNameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','image']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductNameImageSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializerDetail(serializers.ModelSerializer):
    customer = UserSerializerBasic()
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = "__all__"
    
class OrderInputSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset = Product.objects.all())
    quantity = serializers.IntegerField(min_value=1)

class OrderCreateSerializer(serializers.Serializer):
    items = OrderInputSerializer(many=True)

    def create(self,validated_data):
        items = validated_data.pop('items',[])
        print("Items:",items)
        user = self.context["request"].user

        order_items = []

        for item in items:
            product = item['product']
            quantity = item['quantity']
            total_price = 0

            if hasattr(product,'stock') and quantity > product.stock:
                raise serializers.ValidationError({
                    "detail": f"Insufficient Stock for {product.name}. Available: {product.stock}"
                })            
            discount_price = product.discount/100*product.price
            item_price = product.price - discount_price
            total_price+=item_price
                      
            print("Item appending",item)
            order_items.append({
                "product":product,
                "quantity": quantity,
                "price": item_price
            })

        new_order = Order.objects.create(customer = user, total_price = total_price )
        print("OrderItems",order_items)
        for item in order_items:

            OrderItem.objects.create(
                order=new_order,
                product = item['product'],
                quantity = item['quantity'],
                price = item['price']
            )

            product.stock-=quantity
            product.save()
        print("new order",new_order)
        return new_order






