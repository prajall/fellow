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


# Create your views here.
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return api_error(400,"Email and Password are required")
    
        existing_user = User.objects.filter(email=email).exists()

        if existing_user:
            return api_error(400,"Email already exists")

        new_user = User.objects.create_user(email=email, password=password)
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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201 )
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"detail": "Successfully logged out."}, status=200)

class loginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

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


