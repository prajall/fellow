from rest_framework import serializers
from .models import Order
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

class OrderSerializerDetail(serializers.ModelSerializer):
    product = ProductSerializerBasic()
    customer = UserSerializerBasic()
    
    class Meta:
        model = Order
        fields = "__all__"
    