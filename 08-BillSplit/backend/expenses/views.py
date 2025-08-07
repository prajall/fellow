from logging import raiseExceptions
from django.shortcuts import render
from rest_framework.views import APIView
from .models import ExpenseModel
from .serializers import ExpenseSerializer
from rest_framework.permissions import IsAuthenticated
from groups.permissions import IsGroupMember
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpenseParticipantSerializer
from .models import ExpenseParticipant
from .utils import calculate_and_create_debts, optimize_debts_for_group, get_user_debt_summary
from .serializers import ExpenseModelSerializer

# Create your views here.
class ExpenseListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsGroupMember]

    queryset = ExpenseModel.objects.all()
    serializer_class = ExpenseSerializer


    def post(self, request):
        expense_serializer = ExpenseSerializer(data=request.data)
        expense_serializer.is_valid(raise_exception=True)

        expense_participant_data = request.data.pop('participants', [])

        expense_participant_serializer = ExpenseParticipantSerializer(data=expense_participant_data, many=True)
        expense_participant_serializer.is_valid(raise_exception=True)


        expense_serializer.save()
        return Response(expense_serializer.data, status=status.HTTP_201_CREATED)
        

class ExpenseDetailView(APIView):
    permission_classes = [IsAuthenticated, IsGroupMember]

    queryset = ExpenseModel.objects.all()
    serializer_class = ExpenseSerializer


class CalculateDebtsView(APIView):
    """
    API view to calculate and create debts for an expense
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, expense_id):
        """
        Calculate and create debts for a specific expense
        """
        result = calculate_and_create_debts(expense_id)
        
        if "error" in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_201_CREATED)


class OptimizeGroupDebtsView(APIView):
    """
    API view to optimize all debts in a group
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, group_id):
        """
        Optimize all debts in a group by consolidating them
        """
        result = optimize_debts_for_group(group_id)
        
        if "error" in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)


class UserDebtSummaryView(APIView):
    """
    API view to get debt summary for a user
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id=None, group_id=None):
        """
        Get debt summary for a user (optionally filtered by group)
        """
        # If no user_id provided, use the authenticated user
        if user_id is None:
            user_id = request.user.id
        
        result = get_user_debt_summary(user_id, group_id)
        
        return Response(result, status=status.HTTP_200_OK)


class ExpenseWithDebtsView(APIView):
    """
    API view to get expense details with calculated debts
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, expense_id):
        """
        Get expense details and calculate debts without creating them
        """
        try:
            expense = ExpenseModel.objects.get(id=expense_id)
            participants = ExpenseParticipant.objects.filter(expense_id=expense_id)
            
            # Calculate net amounts for each participant
            participant_summary = []
            total_paid = 0
            total_allocated = 0
            
            for participant in participants:
                net_amount = participant.paid_amount - participant.allocated_amount
                total_paid += participant.paid_amount
                total_allocated += participant.allocated_amount
                
                participant_summary.append({
                    'user_id': participant.user_id.id,
                    'username': participant.user_id.username,
                    'paid_amount': participant.paid_amount,
                    'allocated_amount': participant.allocated_amount,
                    'net_amount': net_amount,
                    'is_creditor': net_amount > 0,
                    'is_debtor': net_amount < 0
                })
            
            # Sort by net amount
            participant_summary.sort(key=lambda x: x['net_amount'], reverse=True)
            
            return Response({
                'expense': ExpenseModelSerializer(expense).data,
                'participants': participant_summary,
                'total_paid': total_paid,
                'total_allocated': total_allocated,
                'balance': total_paid - total_allocated,
                'creditors': [p for p in participant_summary if p['is_creditor']],
                'debtors': [p for p in participant_summary if p['is_debtor']]
            }, status=status.HTTP_200_OK)
            
        except ExpenseModel.DoesNotExist:
            return Response(
                {"error": "Expense not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )