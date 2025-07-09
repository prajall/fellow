from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect 
from django.http import HttpResponseBadRequest
from django.urls import reverse
from django.forms.models import model_to_dict
from .models import Product
from .models import Brand
from .models import Category
from rest_framework.decorators import api_view
from .apiResponse import apiResponse,apiError
from .serializers import ProductSerializer,ProductAddSerializer, BrandSerializer, CategorySerializer


# Get all Products and add a new product
@api_view(['GET','POST'])
def all_products(request):

    if request.method == 'POST':
        data = request.data
        serializer = ProductAddSerializer(data = data)

        if serializer.is_valid():
            new_product = serializer.save()
            return apiResponse(200,"New Product Created",ProductSerializer(new_product).data)
        else:
            return apiError(400,"Product validation failed",serializer.errors)

    if request.method == 'GET':
        brand_id = request.GET.get('brand')
        category_id = request.GET.get('category')
        print(brand_id, category_id)
        try:
            products = Product.objects.select_related('brand','category').order_by('-created_at').all();
            if brand_id:
                products = products.filter(brand = int(brand_id))
            if category_id:
                products = products.filter(category= int(category_id))
            
            all_brands = Brand.objects.all()
            all_categories = Category.objects.all()

            productSerializer = ProductSerializer(products,many=True)
            brandSerializer = BrandSerializer(all_brands,many=True)
            categorySerializer = CategorySerializer(all_categories, many=True)


        except Exception as e:
            print("Error in home view: ",e)
            return HttpResponse("Internal Server Error")

        else:
            data = {"products":productSerializer.data,"brands":brandSerializer.data,"categoryes":categorySerializer.data}
            return apiResponse(200,"All products retrieved",data=data)

# get detail of a product or edit or delete
@api_view(['GET','PATCH','DELETE'])
def product_detail(request,id):
    queryset = get_object_or_404(Product,pk=id)

    if request.method == 'PATCH':
        data = request.data
        serializer = ProductAddSerializer(queryset,data = data,partial=True)
        if serializer.is_valid():
            saved = serializer.save()
            return apiResponse(200, "Updated successfully",ProductSerializer(saved).data)
        else:
            return apiError(400,"Validation failed",serializer.errors)
    
    elif request.method == 'DELETE':
        queryset.delete()
        return apiResponse(200,"Deleted Successfully",{})

    else:
        data = ProductSerializer(queryset)
        print("product detail:",data.data)
        return apiResponse(200,"Product detail fetched successfully",data.data)

