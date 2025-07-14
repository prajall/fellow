from .views import signup,loginView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/",signup),
    path("login/",loginView.as_view()),
    path('token/refresh/',TokenRefreshView.as_view())
]
