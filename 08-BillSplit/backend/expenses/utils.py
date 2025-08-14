from debt.utils import update_debt
from expenses.serializers import ExpenseParticipantSerializer


def validate_participant_and_create_debt(participants_data, new_expense):

    borrowers = []
    lenders = []
    for participant_data in participants_data:
        print("participant_data", participant_data)
        participant_data['expense_id'] = new_expense.id
        participant_serializer = ExpenseParticipantSerializer(data=participant_data)
        participant_serializer.is_valid(raise_exception=True)
        participant_serializer.save()

        if participant_data.get('paid_amount', 0) > participant_data.get('allocated_amount', 0):
            participant_data['borrow_amount'] = participant_data['paid_amount'] - participant_data['allocated_amount']
            borrowers.append(participant_data)
        else:
            participant_data['lend_amount'] = participant_data['allocated_amount'] - participant_data['paid_amount']
            lenders.append(participant_data)

    for borrower in borrowers:
        if borrower['borrow_amount'] == 0:
            break
        for lender in lenders:
            if lender['lend_amount'] == 0:
                break
            if lender['lend_amount'] >= borrower['borrow_amount']:
                debt_amount = borrower['borrow_amount']
                update_debt(borrower['user_id'], lender['user_id'], debt_amount, new_expense.group_id)
                # update_debt(lender['user_id'], borrower['user_id'], debt_amount, new_expense.group_id)

                borrower['borrow_amount'] = 0
                lender['lend_amount'] -= debt_amount
            else:
                debt_amount = lender['lend_amount']
                update_debt(borrower['user_id'], lender['user_id'], debt_amount, new_expense.group_id)
                # update_debt(lender['user_id'], borrower['user_id'], debt_amount, new_expense.group_id)

                lender['lend_amount'] = 0
                borrower['borrow_amount'] -= debt_amount

