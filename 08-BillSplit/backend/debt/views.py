from django.shortcuts import render
from rest_framework import generics, views
from .models import DebtModel
from .serializers import DebtSerializer
from rest_framework.permissions import IsAuthenticated
from groups.permissions import IsGroupMember
from .permissions import IsDebtMember
from .utils import update_debt
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class DebtListCreateView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    # queryset = DebtModel.objects.all()
    serializer_class = DebtSerializer

    def list(self, request, *args, **kwargs):
        queryset = DebtModel.objects.filter(group=request.query_params.get('group_id')).all()
        serializer = DebtSerializer(queryset, many=True)
        return Response(serializer.data)

class DebtDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    queryset = DebtModel.objects.all()
    serializer_class = DebtSerializer

class DebtSettleView(views.APIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    serializer_class = DebtSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['group'] = request.data.get('group_id')
        print("data", data)
        serializer = DebtSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        debt = update_debt(data['user_b'], data['user_a'], data['amount'], data['group'])
        if debt:
            return Response(DebtSerializer(debt).data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

class GetUserBalance(views.APIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    serializer_class = DebtSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        group = request.query_params.get('group_id')
        borrows = DebtModel.objects.filter(group=group, user_b=user)
        lends = DebtModel.objects.filter(group=group, user_a=user)
        total_borrows = sum(borrow.amount for borrow in borrows)
        total_lends = sum(lend.amount for lend in lends)
        balance = total_borrows - total_lends
        return Response({"balance": balance})