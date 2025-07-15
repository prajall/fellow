from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r"",CategoryView)

urlpatterns = [
    path("category/",include(router.urls)),
    path("",ProductListCreate.as_view()),
    path("<int:pk>",ProductDetail.as_view())
]
