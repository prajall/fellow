from .views import DebtListCreateView, DebtDetailView, DebtSettleView, GetUserBalance
from django.urls import path


urlpatterns= [
    path('', DebtListCreateView.as_view(), name='debt-list-create'),
    path('<int:pk>/', DebtDetailView.as_view(), name='debt-detail'),
    path('settle/', DebtSettleView.as_view(), name='debt-settle'),
    path('get-balance/', GetUserBalance.as_view()),
]