from django.urls import path
from .views import all_products
from .views import create_product

app_name = "task2_ecom"
urlpatterns = [
    path("",all_products,name="all_products"),
    path("create/",create_product,name="create_product")
]
