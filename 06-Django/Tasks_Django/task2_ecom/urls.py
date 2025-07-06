from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import all_products
from .views import create_product
from .views import delete_product
from .views import edit_product

app_name = "task2_ecom"
urlpatterns = [
    path("",all_products,name="all_products"),
    path("create/",create_product,name="create_product"),
    path("edit/<int:id>",edit_product,name="edit_product"),
    path("delete/<int:id>",delete_product,name='delete_product')

] 
