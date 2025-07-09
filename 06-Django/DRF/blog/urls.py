from django.urls import path
from .views import blogView, updateBlog

urlpatterns = [
    path('',blogView),
    path('update/<int:id>',updateBlog)
]
