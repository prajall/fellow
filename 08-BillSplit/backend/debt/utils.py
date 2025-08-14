from .models import DebtModel
from django.db import models
from users.models import User

def update_debt(user_a, user_b, amount, group):
    if user_a == user_b:
        return
    existing_debt = DebtModel.objects.filter(
        (
            (models.Q(user_a_id=user_a) & models.Q(user_b_id=user_b)) |
            (models.Q(user_a_id=user_b) & models.Q(user_b_id=user_a))
        ) &
        models.Q(group=group) 
    ).first()
    print("Existing debt", existing_debt)
    if existing_debt:
        if existing_debt.user_a.id == user_a:
            existing_debt.amount += amount
        else:
            existing_debt.amount -= amount
        if existing_debt.amount == 0:
            print("Debt deleted")
            existing_debt.delete()
            return None
        existing_debt.save()
        print("New debt", existing_debt)
        return existing_debt
    else:
        print("Creating new debt", user_a, user_b, amount, group)
        user_a = User.objects.get(id=user_a)
        user_b = User.objects.get(id=user_b)
        debt = DebtModel.objects.create(user_a=user_a, user_b=user_b, amount=amount, group=group)
        print("Debt created", debt)
        return debt
    
