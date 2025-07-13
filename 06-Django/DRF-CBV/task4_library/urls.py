from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'authors', views.AuthorViewSet)
router.register(r'publishers', views.PublisherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('books/', views.BookListCreate.as_view()),
    path('books/<int:pk>/', views.BookDetail.as_view()),
    path('members/', views.MemberListCreate.as_view()),
    path('members/<int:pk>/', views.MemberDetail.as_view()),
    path('borrowings/', views.BorrowingListCreate.as_view()),
    path('borrowings/<int:pk>/', views.BorrowingDetail.as_view()),
] 