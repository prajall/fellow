from django.urls import path, include
from .views import BlogList, BlogDetail
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, UserListView, UserDetail

router = DefaultRouter()
router.register(r'blog',BlogViewSet)

urlpatterns = [
    path('blogs/',BlogList.as_view()),
    path('blogs/<int:pk>/',BlogDetail.as_view()),

    path('',include(router.urls)),
    path('users',UserListView.as_view()),
    path('users/<int:pk>',UserDetail.as_view())
]
