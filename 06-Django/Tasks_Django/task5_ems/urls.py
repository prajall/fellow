from django.urls import path
from .views import event_list, event_detail, register_attendee, event_add, event_edit, cancel_registration

app_name = "task5_ems"
urlpatterns = [
      path('',event_list, name='event_list'),
      path('event/add/',event_add, name='event_add'),
      path('event/edit/<int:event_id>',event_edit, name='event_edit'),
      path('event/<int:event_id>/',event_detail, name='event_detail'),
      path('event/<int:event_id>/register',register_attendee, name='register_event'),
      path('registration/cancel/<int:id>',cancel_registration, name='cancel_registration')
]