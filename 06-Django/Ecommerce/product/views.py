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
        
        return queryset


    # @swagger_auto_schema(
    #     request_body=ProductSerializerDetail,
    #     responses={201: ProductSerializerDetail, 400: 'Invalid data'}
    # )

class ProductList(APIView):
    def get(self,request):
        queryset = Product.objects.all()
        serializer = None
        search_query = request.GET.get("search")
        category = request.GET.get("category")

        if search_query:
            queryset = queryset.filter(name__icontains = search_query)      
        if category:
            queryset = queryset.filter(category = category)      

        if request.user.is_admin:
            serializer = ProductSerializerDetail(queryset, many=True)
        else:
            serializer = ProductSerializerBasic(queryset, many=True)

        Response(serializer.data, status = 200)
        


        


    # def post(self, request):
    #     data = request.data
    #     serializer = ProductSerializerDetail(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response({"error": "Invalid data"}, status=400)
    
    




