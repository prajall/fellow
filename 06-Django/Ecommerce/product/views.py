from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import generics
from app import permissions
from rest_framework.permissions import SAFE_METHODS



# Create your views here.

class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminOrReadOnly]

    def get_serializer_class(self):

        if self.request.method not in SAFE_METHODS:
            return ProductSerializerCreate

        if self.request.user.is_authenticated and getattr(self.request.user,"is_admin", False):
            return ProductSerializerDetail
        else:
            return ProductSerializerBasic
    
    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.GET.get("search")
        category = self.request.GET.get("category")

        if search_query:
            queryset = queryset.filter(name__icontains = search_query)      
        if category:
            queryset = queryset.filter(category = category)  
        
        if not getattr(self.request.user, "is_admin", False):
            queryset = queryset.filter(is_active=True).all()
        
        return queryset


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializerCreate
    permission_classes = [permissions.IsAdmin]

