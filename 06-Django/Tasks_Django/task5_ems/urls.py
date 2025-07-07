from django.urls import path
from .views import event_list, event_detail

app_name = "task5_ems"
urlpatterns = [
      path('',event_list, name='event_list'),
      path('event/<int:event_id>/',event_detail, name='event_detail'),
]