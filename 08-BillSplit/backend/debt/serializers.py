from rest_framework import serializers
from .models import DebtModel
from users.serializers import UserSerializer

class DebtSerializer(serializers.ModelSerializer):
    user_a = UserSerializer(read_only=True)
    user_b = UserSerializer(read_only=True)
    
    class Meta:
        model = DebtModel
        fields = '__all__'