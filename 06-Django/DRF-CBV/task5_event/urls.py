from django.urls import path, include
from .views import VenueViewSet, OrganizerViewSet, EventListCreate, EventDetail, RegistrationListCreate, RegistrationDetail, 
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"venue/", VenueViewSet)
router.register(r"organizer/", OrganizerViewSet)

urlpatterns = [
    path("",include(router.urls))
    path("events/", EventListCreate, name="events"),
    path("events/<int:pk>/", EventDetail, name="event_detail"),
    path("registration/", RegistrationListCreate, name = "registration"),
    path("registration/<int:pk>",RegistrationDetail, name = "registration_detail")
]
