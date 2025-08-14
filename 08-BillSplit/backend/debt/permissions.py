from rest_framework import permissions
from .models import DebtModel
from django.db.models import Q

class IsDebtMember(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.user
        group_id = view.kwargs.get('pk')
        # check if either user_a or user_b is the current user
        is_debt_member = DebtModel.objects.filter(Q(user_a=user_id) | Q(user_b=user_id), group_id=group_id).exists()
        return is_debt_member