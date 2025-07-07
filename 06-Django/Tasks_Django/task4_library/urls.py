from django.urls import path
from . import views

app_name = 'task4_library'

urlpatterns = [
    # Add your URL patterns here
    # Example:
    path('', views.home, name='home'),
    path('book/create', views.book_create, name='book_create'),
    path('book', views.book_list, name='book_list'),
    path('member/create', views.member_create, name='member_create'),
    path('member', views.member_list, name='member_list'),
    path('burrow/create', views.burrow_create, name='burrow_create'),
    path('burrow', views.burrow_list, name='burrow_list'),
    path('burrow/return/<int:id>', views.burrow_return, name='burrow_return')

] 