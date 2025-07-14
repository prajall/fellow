from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .serializers import UserSerializer


# Create your views here.

@api_view(['POST','GET'])    
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response("Username and Password are required",status=400)
    
        existing_user = User.objects.filter(username=username).exists()

        if existing_user:
            return Response("Username already taken",status=400)

        new_user = User.objects.create_user(username=username, password=password)
        serializer  = UserSerializer(new_user)
        token = Token.objects.create(user = new_user)
        print(type(token))

        return Response({"message":"User created Successfully","user":serializer.data,"token":token.key}, status=201)
    
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)




