from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields=['id','email','name','password','profile_image']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    
class UserSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name']

class LoginUserSerializer(serializers.ModelSerializer):
   
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email','password']
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(email=email, password=password)
        print(user)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return attrs
    
    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email")
        return value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = user.name
        return token

    def validate(self, attrs):
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)
