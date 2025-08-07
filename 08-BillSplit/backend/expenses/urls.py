from django.urls import path
from .views import (
    CalculateDebtsView, 
    OptimizeGroupDebtsView, 
    UserDebtSummaryView, 
    ExpenseWithDebtsView
)

urlpatterns = [
    # Debt calculation endpoints
    path('expenses/<int:expense_id>/calculate-debts/', CalculateDebtsView.as_view(), name='calculate-debts'),
    path('groups/<int:group_id>/optimize-debts/', OptimizeGroupDebtsView.as_view(), name='optimize-group-debts'),
    path('users/<int:user_id>/debt-summary/', UserDebtSummaryView.as_view(), name='user-debt-summary'),
    path('users/debt-summary/', UserDebtSummaryView.as_view(), name='current-user-debt-summary'),
    path('expenses/<int:expense_id>/with-debts/', ExpenseWithDebtsView.as_view(), name='expense-with-debts'),
]
