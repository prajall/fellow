from django.urls import path
from .views import all_products
from .views import product_detail
# from .views import create_product
# from .views import delete_product
# from .views import edit_product

app_name = "ecommerce"
urlpatterns = [
    path("product/",all_products,name="all_products"),
    path("product/<int:id>",product_detail,name="product_detail"),
    # path("create/",create_product,name="create_product"),
    # path("edit/<int:id>",edit_product,name="edit_product"),
    # path("delete/<int:id>",delete_product,name='delete_product')

] 
