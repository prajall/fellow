"""
Example usage of the debt calculation algorithm

This file demonstrates how the debt calculation algorithm works with a practical example.
"""

from decimal import Decimal
from .utils import calculate_and_create_debts, optimize_debts_for_group, get_user_debt_summary


def example_debt_calculation():
    """
    Example: Restaurant bill splitting scenario
    
    Scenario: 4 friends go to a restaurant
    - Alice paid Rs. 1000 (but should pay Rs. 250)
    - Bob paid Rs. 0 (but should pay Rs. 250) 
    - Charlie paid Rs. 500 (but should pay Rs. 250)
    - David paid Rs. 0 (but should pay Rs. 250)
    
    Total bill: Rs. 1000
    Each person's share: Rs. 250
    """
    
    print("=== Restaurant Bill Splitting Example ===")
    print("Total bill: Rs. 1000")
    print("Each person's share: Rs. 250")
    print()
    
    # This would be the data structure if we had the expense in the database
    example_participants = [
        {'user': 'Alice', 'paid': 1000, 'allocated': 250, 'net': 750},  # Creditor
        {'user': 'Bob', 'paid': 0, 'allocated': 250, 'net': -250},      # Debtor
        {'user': 'Charlie', 'paid': 500, 'allocated': 250, 'net': 250}, # Creditor
        {'user': 'David', 'paid': 0, 'allocated': 250, 'net': -250}     # Debtor
    ]
    
    print("Participant Summary:")
    for p in example_participants:
        status = "Creditor" if p['net'] > 0 else "Debtor"
        print(f"- {p['user']}: Paid Rs.{p['paid']}, Share Rs.{p['allocated']}, Net: Rs.{p['net']} ({status})")
    
    print()
    print("Debt Calculation Algorithm Steps:")
    print("1. Identify creditors (positive net): Alice (+750), Charlie (+250)")
    print("2. Identify debtors (negative net): Bob (-250), David (-250)")
    print("3. Match debtors with creditors:")
    print("   - Bob owes Alice Rs. 250")
    print("   - David owes Alice Rs. 250")
    print("   - Alice is left with Rs. 250 credit (no one owes her)")
    print("   - Charlie is left with Rs. 250 credit (no one owes him)")
    
    print()
    print("Final Debt Records:")
    print("- Bob → Alice: Rs. 250")
    print("- David → Alice: Rs. 250")
    print("- Alice → Charlie: Rs. 250 (to balance Alice's remaining credit)")
    
    print()
    print("Optimized Result:")
    print("- Bob → Alice: Rs. 250")
    print("- David → Alice: Rs. 250")
    print("- Alice → Charlie: Rs. 250")
    
    return example_participants


def algorithm_explanation():
    """
    Detailed explanation of the debt calculation algorithm
    """
    
    print("=== Debt Calculation Algorithm Explanation ===")
    print()
    print("The algorithm follows these steps:")
    print()
    print("1. CALCULATE NET AMOUNTS:")
    print("   - For each participant: net = paid_amount - allocated_amount")
    print("   - Positive net = creditor (paid more than share)")
    print("   - Negative net = debtor (paid less than share)")
    print()
    
    print("2. SORT PARTICIPANTS:")
    print("   - Sort creditors by net amount (highest first)")
    print("   - Sort debtors by absolute net amount (highest first)")
    print("   - This ensures efficient matching")
    print()
    
    print("3. MATCH DEBTORS WITH CREDITORS:")
    print("   - For each debtor, find creditors who can cover their debt")
    print("   - Create debt records: debtor → creditor")
    print("   - Update remaining amounts for both parties")
    print()
    
    print("4. DEBT RECORD CONVENTION:")
    print("   - user_a and user_b are ordered by user ID")
    print("   - Positive amount: user_a owes user_b")
    print("   - Negative amount: user_b owes user_a")
    print()
    
    print("5. OPTIMIZATION:")
    print("   - Consolidate multiple debts between same users")
    print("   - Reduce number of debt records while maintaining net amounts")
    print()


def usage_examples():
    """
    Examples of how to use the API endpoints
    """
    
    print("=== API Usage Examples ===")
    print()
    
    print("1. Calculate debts for an expense:")
    print("POST /api/expenses/1/calculate-debts/")
    print("Response: {'message': 'Successfully created 3 debt records', ...}")
    print()
    
    print("2. Optimize debts in a group:")
    print("POST /api/groups/1/optimize-debts/")
    print("Response: {'message': 'Optimized debts: 2 records created', ...}")
    print()
    
    print("3. Get user debt summary:")
    print("GET /api/users/1/debt-summary/")
    print("Response: {'user_id': 1, 'net_debt': 150.00, 'is_debtor': True, ...}")
    print()
    
    print("4. Get expense details with debt calculation:")
    print("GET /api/expenses/1/with-debts/")
    print("Response: {'expense': {...}, 'participants': [...], 'creditors': [...], 'debtors': [...]}")


if __name__ == "__main__":
    algorithm_explanation()
    print("\n" + "="*50 + "\n")
    example_debt_calculation()
    print("\n" + "="*50 + "\n")
    usage_examples() 