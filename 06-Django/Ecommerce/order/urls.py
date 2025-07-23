from django.urls import path, include
from .views import *

urlpatterns = [
    # path("create/",OrderCreateView.as_view()),
    path("",OrderListCreateView.as_view()),
    path("<int:pk>", OrderDetail.as_view()),
    path('status/<int:pk>/', ChangeOrderStatus.as_view())

]
