from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import ModelViewSet
from .models import Brand, Category, Product
from rest_framework.views import APIView
from .serializers import BrandSerializer, CategorySerializer, ProductSerializer
from rest_framework import permissions
from rest_framework import status

# Create your views here.

# Generic View
class BrandListCreate(ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BrandDetail(RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# ViewSet and router
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# APIView
class ProductListCreate(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get(self,request):
        brand = request.GET.get("brand","")
        category = request.GET.get("category","")
        search = request.GET.get("search","")
        queryset = Product.objects.all()
        if brand:
            queryset = queryset.filter(brand = brand)
        if category:
            queryset = queryset.filter(category = category)
        if search:
            queryset = queryset.filter(name__icontains = search)
        serializer = ProductSerializer(queryset,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
# Mixins
class ProductDetail(RetrieveModelMixin,UpdateModelMixin,DestroyModelMixin, GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        
