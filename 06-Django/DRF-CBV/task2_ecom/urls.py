from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("category/",views.CategoryViewSet)

urlpatterns = [
    path("brand/",views.BrandListCreate.as_view()),
    path("brand/<int:pk>", views.BrandDetail.as_view()),
    path("",include(router.urls)),
    path("product/",views.ProductListCreate.as_view())
]
