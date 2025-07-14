from django.shortcuts import render
from rest_framework.response import Response 
from django.http import HttpResponse

# Create your views here.
def login(request):
    username = request.data.username
    print("username",username)
    return ("hi")

def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username and not password:
        return HttpResponse()