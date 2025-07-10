from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def login(request):
    username = request.data.username
    print("username",username)
    return ("hi")
