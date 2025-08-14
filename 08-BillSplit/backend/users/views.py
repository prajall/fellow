from django.shortcuts import render
from .models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from app.utils import api_response, api_error
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken



# Create your views here.
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name')

        if not email or not password:
            return api_error(400,"Email and Password are required")
    
        existing_user = User.objects.filter(email=email).exists()

        if existing_user:
            return api_error(400,"Email already exists")

        new_user = User.objects.create_user(email=email, password=password, name=name)
        # send confirmation email

        # mail = send_mail(
        #     subject='Activate your account',
        #     message=f'Click the link to activate your account',
        #     from_email=None,
        #     recipient_list=[email],
        #     fail_silently=False,
        # )

        # print("Mail sent successfully:", mail)

        serializer  = UserSerializer(new_user)
        return api_response(201,"User created successfully",serializer.data)
    
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)

class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201 )
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        response = Response({"detail": "Successfully logged out."}, status=200)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

# class loginView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        refresh = CustomTokenObtainPairSerializer.get_token(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response(
            {
                "message": "Login successful",
                "user": UserSerializerBasic(user).data
            },
            status=status.HTTP_200_OK
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,  
            samesite="None",
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,  
            samesite="None",
        )

        return response

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializerBasic(request.user)
        return Response(serializer.data)
    
class UserInfoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


