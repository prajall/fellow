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
    

def minimize_transactions(group):
    debts = DebtModel.objects.filter(group=group).all()
    min_debts = {}

    for debt in debts:
        min_debts[debt.user_a.id] = min_debts.get(debt.user_a.id, 0) - debt.amount
        min_debts[debt.user_b.id] = min_debts.get(debt.user_b.id, 0) + debt.amount
    
    borrowers = []
    lenders = []
    for user_id, amount in min_debts.items():
        if amount != 0:
            if amount > 0:
                borrowers.append({
                    'user_id': user_id,
                    'amount': amount
                })
            else:
                lenders.append({
                    'user_id': user_id,
                    'amount': amount
                })

    for borrower in borrowers:
        if borrower['amount'] == 0:
            break
        for lender in lenders:
            if lender['amount'] == 0:
                break
            if lender['amount'] >= borrower['amount']:
                debt_amount = borrower['amount']
                update_debt(borrower['user_id'], lender['user_id'], debt_amount, group)
                # update_debt(lender['user_id'], borrower['user_id'], debt_amount, group)

                borrower['amount'] = 0
                lender['amount'] -= debt_amount
            else:
                debt_amount = lender['amount']
                update_debt(borrower['user_id'], lender['user_id'], debt_amount, group)
                # update_debt(lender['user_id'], borrower['user_id'], debt_amount, group)

                lender['amount'] = 0
                borrower['amount'] -= debt_amount


