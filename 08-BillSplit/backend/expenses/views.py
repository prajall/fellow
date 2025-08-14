from rest_framework import viewsets, generics
from .models import ExpenseModel
from .serializers import ExpenseSerializer, ExpenseParticipantSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from rest_framework.exceptions import ValidationError
from debt.utils import update_debt, minimize_transactions
from rest_framework.permissions import IsAuthenticated
from groups.permissions import IsGroupMember
import json
from expenses.utils import validate_participant_and_create_debt

class ExpenseViewSet(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    queryset = ExpenseModel.objects.all()
    serializer_class = ExpenseSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = ExpenseSerializer(data=data, context={'request': request})
        with transaction.atomic():
            try:
                serializer.is_valid(raise_exception=True)
                participants_data = request.data.get('participants', [])
            
                if not type(participants_data) == list:
                    return Response({"detail": "Participants must be a list"}, status=status.HTTP_400_BAD_REQUEST)
                
                if len(participants_data) <=1:
                    return Response({"detail": "Atleast 2 participants are required"}, status=status.HTTP_400_BAD_REQUEST)
                total_amount = sum(participant_data.get('paid_amount', 0) for participant_data in participants_data)
                
                new_expense = serializer.save()
                if total_amount != new_expense.total_amount:
                    return Response({"total_amount": "Sum of paid amounts does not match the total amount"}, status=status.HTTP_400_BAD_REQUEST)
                
                validate_participant_and_create_debt(participants_data, new_expense)
                # minimize_transactions(new_expense.group_id)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            except ValidationError as e:
                # new_expense.delete()
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                # new_expense.delete()
                print("Error", e)
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def list(self, request, *args, **kwargs):
        queryset = ExpenseModel.objects.filter(group_id=request.query_params.get('group_id')).order_by('-created_at')
        serializer = ExpenseSerializer(queryset, many=True)
        return Response(serializer.data)