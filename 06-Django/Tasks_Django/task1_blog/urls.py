from django.urls import path
from .views import home_view

app_name = "task1_blog"
urlpatterns = [
    path("",home_view, name="home_view")
]
