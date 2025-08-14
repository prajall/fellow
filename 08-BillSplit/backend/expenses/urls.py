from django.urls import path
from .views import ExpenseViewSet

urlpatterns = [
    path('', ExpenseViewSet.as_view(), name='expenses'),
]
