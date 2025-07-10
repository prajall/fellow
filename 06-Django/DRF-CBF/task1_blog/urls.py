from django.urls import path
from .views import BlogList, BlogDetail
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet

router = DefaultRouter()
router.register(r'blog',BlogViewSet)

urlpatterns = [
    path('',BlogList.as_view()),
    path('blog/<int:pk>',BlogDetail.as_view())
]
