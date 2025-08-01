from django.urls import path
from .views import *

urlpatterns = [
    path("",GroupListCreateView.as_view()),
    path("<int:pk>/",GroupDetailView.as_view()),
    path("<int:pk>/invite/",InviteMember.as_view()),
    path("<int:pk>/accept/",AcceptInvitation.as_view()),
]
