from .models import DebtModel
from django.db import models
from users.models import User
from decimal import Decimal

def update_debt(user_a, user_b, amount, group):
    try:
        amount = Decimal(str(amount))  
    except Exception:
        raise ValueError("Amount must be a number")

    if user_a == user_b:
        return

    existing_debt = DebtModel.objects.filter(
        (
            (models.Q(user_a_id=user_a) & models.Q(user_b_id=user_b)) |
            (models.Q(user_a_id=user_b) & models.Q(user_b_id=user_a))
        ) &
        models.Q(group=group) 
    ).first()
    if existing_debt:
        print("Existing debt amount", type(existing_debt.amount), existing_debt.amount)
        print("Amount", type(amount), amount)
        if existing_debt.user_a.id == user_a:
            print("Adding amount to existing debt",existing_debt, amount)
            existing_debt.amount += amount
        else:
            print("Subtracting amount from existing debt",existing_debt, amount)
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
    

# def minimize_transactions(group):

