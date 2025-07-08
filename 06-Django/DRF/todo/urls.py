from django.urls import path
from .views import todoView, updateTodo

urlpatterns = [
    path('',todoView),
    path('update/<int:id>',updateTodo)
]
