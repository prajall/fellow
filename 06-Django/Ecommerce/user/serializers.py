from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields="__all__"

class UserSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','role']

class UserLoginSerializer(serializers.ModelSerializer):
   
   password = serializers.CharField(write_only=True)

   class Meta:
        model = User
        fields = ['email','password']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = user.name
        token['role'] = user.role
        return token

    def validate(self, attrs):
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)
