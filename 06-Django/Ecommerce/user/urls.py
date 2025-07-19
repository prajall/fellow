from .views import signup,loginView, UserInfoView, SignupView, UserInfoDetailView
from django.urls import path
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path("signup/",SignupView.as_view()),
    path('info/',UserInfoView.as_view()),
    path('info-detail/',UserInfoDetailView.as_view()),
    
    path("login/",loginView.as_view(), name="login_user"),
    path('token/refresh/',TokenRefreshView.as_view())

]
