from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User



class BlogSerializer(serializers.ModelSerializer):

    owner = serializers.StringRelatedField()

    class Meta:
        model=Blog
        fields="__all__"


class UserSerializer(serializers.ModelSerializer):
    
    blogs = serializers.PrimaryKeyRelatedField(many=True, queryset=Blog.objects.all() )
    # blogs = BlogSerializer()

    class Meta:
        model= User
        fields = ['id','username','blogs']