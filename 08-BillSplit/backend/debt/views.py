from django.shortcuts import render
from rest_framework import generics
from .models import DebtModel
from .serializers import DebtSerializer
from rest_framework.permissions import IsAuthenticated
from groups.permissions import IsGroupMember
from .permissions import IsDebtMember

# Create your views here.
class DebtListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsGroupMember, IsDebtMember]
    queryset = DebtModel.objects.all()
    serializer_class = DebtSerializer

class DebtDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsGroupMember]
    queryset = DebtModel.objects.all()
    serializer_class = DebtSerializer