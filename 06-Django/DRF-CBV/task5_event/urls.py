from django.urls import path, include
from .views import VenueViewSet, OrganizerViewSet, EventListCreate, EventDetail, RegistrationListCreate, RegistrationDetail
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"venue/", VenueViewSet)
router.register(r"organizer/", OrganizerViewSet)

urlpatterns = [
    path("",include(router.urls)),
    path("events/", EventListCreate.as_view),
    path("events/<int:pk>/", EventDetail.as_view), 
    path("registration/", RegistrationListCreate.as_view ),
    path("registration/<int:pk>",RegistrationDetail.as_view)
]
