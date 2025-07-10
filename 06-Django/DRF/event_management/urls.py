from django.urls import path
from .views import events, event_detail, attendees, cancel_attendee_registration

urlpatterns = [
    path("events/", events, name="events"),
    path("events/<int:pk>/", event_detail, name="event_detail"),
    path("events/<int:event_id>/attendees/", attendees, name="attendees"),
    path("events/<int:event_id>/attendee/<int:attendee_id>/", cancel_attendee_registration, name="cancel_attendee_registration"),
]
