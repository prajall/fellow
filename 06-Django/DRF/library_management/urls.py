from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.book_list_create, name='book-list-create'),
    path('books/<int:id>/', views.book_detail, name='book-detail'),
    path('members/', views.member_list_create, name='member-list-create'),
    path('members/<int:id>/', views.member_detail, name='member-detail'),
    path('borrowings/', views.borrowing_list_create, name='borrowing-list-create'),
    path('borrowings/<int:id>/', views.borrowing_detail, name='borrowing-detail'),
    path('borrowings/active/', views.active_borrowings, name='active-borrowings'),
    path('borrowings/<int:id>/return/', views.mark_as_returned, name='borrowing-return'),
] 