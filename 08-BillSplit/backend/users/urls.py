from .views import *
from django.urls import path
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path("signup/",signup, name="signup_user"),
    path('info/',UserInfoView.as_view()),
    path('info-detail/',UserInfoDetailView.as_view()),
    path('logout/',LogoutView.as_view()),
    path("login/",LoginView.as_view(), name="login_user"),
    path('token/refresh/',TokenRefreshView.as_view())

]
