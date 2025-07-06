from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect 
from django.http import HttpResponseBadRequest
from django.urls import reverse
from django.forms.models import model_to_dict
from .forms import ProductForm
from .models import Product
from .models import Brand
from .models import Category

# Create your views here.
def all_products(request):
    brand_id = request.GET.get('brand')
    category_id = request.GET.get('category')
    print(brand_id, category_id)
    try:
        products = Product.objects.select_related('brand','category').order_by('-created_at').all();
        for p in products:
            print(p.image.name if p.image else "")
        if brand_id:
            products = products.filter(brand = int(brand_id))
        if category_id:
            products = products.filter(category= int(category_id))
        

        all_brands = Brand.objects.all()
        all_categories = Category.objects.all()

    except Exception as e:
        print("Error in home view: ",e)
        return HttpResponse("Internal Server Error")

    else:
        return render(request, 'task2_ecom/all_products.html', {'products':products,"brands":all_brands,"categories":all_categories})

def detail_view(request,id):

    try:
        product = get_object_or_404(Product,pk=id)

    except Exception as e:
        print("Error in home view: ",e)
        return HttpResponse("Internal Server Error")

    else:
        return render(request, 'task2_ecom/detail.html', {'product':product})

def create_product(request):

    if request.method=='GET':
        return render(request,'task2_ecom/create_product.html',{"form":ProductForm})

    if request.method == 'POST':
        print("reQUEST FILES",request.FILES)
        form = ProductForm(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("task2_ecom:all_products"))
        else:
            return HttpResponseBadRequest
        
def edit_product (request,id):
    product = get_object_or_404(Product, pk=id)

    if request.method == 'GET':
        form = ProductForm(instance = product)
        return render(request,'task2_ecom/create_product.html',{'form':ProductForm(instance=product)})
    
    if request.method == 'POST':
        form = ProductForm(request.POST,request.FILES,instance=product)
        if form.is_valid:
            form.save()
            return HttpResponseRedirect(reverse('task2_ecom:all_products')) 
        else:
            return HttpResponseBadRequest("Bad Request")    
        
def delete_product(request,id):
    product = get_object_or_404(Product,pk=id)
    print(request.method)
    if request.method == 'POST':
        product.delete()
        return HttpResponseRedirect(reverse("task2_ecom:all_products"))
    else:
        return HttpResponse("uNKNOWN REQUEST METHOD")