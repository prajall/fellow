from django.urls import path, include
from .views import *

urlpatterns = [
    path("",OrderListCreateView.as_view()),
    path("<int:pk>", OrderDetail.as_view()),
    path('cancel/<int:pk>', OrderCancel.as_view())

]
