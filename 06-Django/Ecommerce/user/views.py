from django.shortcuts import render
from .models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

@api_view(['POST','GET'])    
def signup(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response("Email and Password are required",status=400)
    
        existing_user = User.objects.filter(email=email).exists()

        if existing_user:
            return Response("Email already taken",status=400)

        new_user = User.objects.create_user(email=email, password=password)
        serializer  = UserSerializer(new_user)
        token = Token.objects.create(user = new_user)

        return Response({"error":"User created Successfully","user":serializer.data,"token":token.key}, status=201)
    
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)

# @csrf_exempt
# @api_view(['GET','POST'])
# def login(request):
#     if request.method == 'POST':
#         email = request.data.get("email")
#         password = request.data.get("password")

#         if not email or not password:
#             return Response({"message":"email and password are required"},status=400)
        
#         user = authenticate(request , email = email, password=password)

#         if not user:
#            return Response({"error":"Invalid Credential"},status=401)
        
#         token = Token.objects.get_or_create(user = user)
#         print(token)
#         return Response({"token":"hey"})
    
#     return Response("Login")
    

class loginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



