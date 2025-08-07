from decimal import Decimal
from django.db import transaction
from .models import ExpenseModel, ExpenseParticipant
from debt.models import Debt
from groups.models import Group
from django.db import models


def calculate_and_create_debts(expense_id):
    """
    Calculate and create debts between participants for a given expense.
    
    Algorithm:
    1. Get all participants for the expense
    2. Calculate net amount for each participant (paid - allocated)
    3. Separate participants into creditors (positive net) and debtors (negative net)
    4. Match debtors with creditors to create debt records
    5. Use transaction to ensure data consistency
    """
    
    try:
        with transaction.atomic():
            # Get the expense and all participants
            expense = ExpenseModel.objects.get(id=expense_id)
            participants = ExpenseParticipant.objects.filter(expense_id=expense_id)
            
            if not participants.exists():
                return {"message": "No participants found for this expense"}
            
            # Calculate net amount for each participant
            participant_net_amounts = []
            for participant in participants:
                net_amount = participant.paid_amount - participant.allocated_amount
                participant_net_amounts.append({
                    'participant': participant,
                    'user': participant.user_id,
                    'net_amount': net_amount,
                    'paid': participant.paid_amount,
                    'allocated': participant.allocated_amount
                })
            
            # Separate into creditors (positive net) and debtors (negative net)
            creditors = [p for p in participant_net_amounts if p['net_amount'] > 0]
            debtors = [p for p in participant_net_amounts if p['net_amount'] < 0]
            
            # Sort by absolute net amount (largest first for efficiency)
            creditors.sort(key=lambda x: x['net_amount'], reverse=True)
            debtors.sort(key=lambda x: abs(x['net_amount']), reverse=True)
            
            # Clear existing debts for this expense (optional - depends on your business logic)
            # Debt.objects.filter(group_id=expense.group_id).delete()
            
            created_debts = []
            
            # Match debtors with creditors
            for debtor in debtors:
                remaining_debt = abs(debtor['net_amount'])
                
                for creditor in creditors:
                    if remaining_debt <= 0:
                        break
                    
                    if creditor['net_amount'] <= 0:
                        continue
                    
                    # Calculate how much this creditor can cover
                    amount_to_transfer = min(remaining_debt, creditor['net_amount'])
                    
                    # Create debt record
                    debt_amount = Decimal(str(amount_to_transfer))
                    
                    # Determine who owes whom
                    if debtor['user'].id < creditor['user'].id:
                        # debtor owes creditor
                        debt = Debt.objects.create(
                            user_a=debtor['user'],
                            user_b=creditor['user'],
                            amount=debt_amount,
                            group_id=expense.group_id
                        )
                    else:
                        # creditor owes debtor (negative amount)
                        debt = Debt.objects.create(
                            user_a=creditor['user'],
                            user_b=debtor['user'],
                            amount=-debt_amount,
                            group_id=expense.group_id
                        )
                    
                    created_debts.append(debt)
                    
                    # Update remaining amounts
                    remaining_debt -= amount_to_transfer
                    creditor['net_amount'] -= amount_to_transfer
            
            return {
                "message": f"Successfully created {len(created_debts)} debt records",
                "created_debts": created_debts,
                "total_participants": len(participant_net_amounts),
                "creditors": len(creditors),
                "debtors": len(debtors)
            }
            
    except ExpenseModel.DoesNotExist:
        return {"error": "Expense not found"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


def optimize_debts_for_group(group_id):
    """
    Optimize all debts in a group by consolidating multiple debts between the same users.
    This reduces the number of debt records while maintaining the same net amounts.
    """
    
    try:
        with transaction.atomic():
            # Get all debts for the group
            debts = Debt.objects.filter(group_id=group_id)
            
            # Group debts by user pairs
            debt_pairs = {}
            
            for debt in debts:
                # Create a consistent key for user pairs (smaller ID first)
                user_a_id = min(debt.user_a.id, debt.user_b.id)
                user_b_id = max(debt.user_a.id, debt.user_b.id)
                pair_key = (user_a_id, user_b_id)
                
                if pair_key not in debt_pairs:
                    debt_pairs[pair_key] = {
                        'user_a': debt.user_a if debt.user_a.id == user_a_id else debt.user_b,
                        'user_b': debt.user_b if debt.user_b.id == user_b_id else debt.user_a,
                        'net_amount': Decimal('0.00')
                    }
                
                # Add or subtract the debt amount
                if debt.user_a.id == user_a_id:
                    debt_pairs[pair_key]['net_amount'] += debt.amount
                else:
                    debt_pairs[pair_key]['net_amount'] -= debt.amount
            
            # Delete all existing debts for this group
            debts.delete()
            
            # Create optimized debt records
            optimized_debts = []
            for pair_key, debt_info in debt_pairs.items():
                if debt_info['net_amount'] != 0:
                    debt = Debt.objects.create(
                        user_a=debt_info['user_a'],
                        user_b=debt_info['user_b'],
                        amount=debt_info['net_amount'],
                        group_id=group_id
                    )
                    optimized_debts.append(debt)
            
            return {
                "message": f"Optimized debts: {len(optimized_debts)} records created",
                "optimized_debts": optimized_debts
            }
            
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


def get_user_debt_summary(user_id, group_id=None):
    """
    Get a summary of debts for a specific user in a group or across all groups.
    """
    
    if group_id:
        debts = Debt.objects.filter(group_id=group_id)
    else:
        debts = Debt.objects.all()
    
    # Debts where user is user_a (positive amount means user_a owes user_b)
    owed_by_user = debts.filter(user_a_id=user_id).aggregate(
        total=models.Sum('amount')
    )['total'] or Decimal('0.00')
    
    # Debts where user is user_b (negative amount means user_a owes user_b)
    owed_to_user = debts.filter(user_b_id=user_id).aggregate(
        total=models.Sum('amount')
    )['total'] or Decimal('0.00')
    
    # Net debt (positive means user owes others, negative means others owe user)
    net_debt = owed_by_user - owed_to_user
    
    return {
        "user_id": user_id,
        "owed_by_user": owed_by_user,
        "owed_to_user": owed_to_user,
        "net_debt": net_debt,
        "is_creditor": net_debt < 0,
        "is_debtor": net_debt > 0
    } 