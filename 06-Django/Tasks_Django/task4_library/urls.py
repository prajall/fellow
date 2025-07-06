from django.urls import path
from . import views

app_name = 'task4_library'

urlpatterns = [
    # Add your URL patterns here
    # Example:
    # path('', views.home, name='home'),
    path('book/create', views.book_create, name='book_create'),
    path('book', views.book_list, name='book_list'),
    path('member/create', views.member_create, name='member_create'),
    path('member', views.member_list, name='member_list'),
] 