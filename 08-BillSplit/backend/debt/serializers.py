from rest_framework import serializers
from .models import DebtModel

class DebtSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DebtModel
        fields = '__all__'