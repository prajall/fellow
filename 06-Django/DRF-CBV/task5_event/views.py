from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Venue, Organizer, Event, Attendee, Registration
from .serializers import VenueSerializer, OrganizerSerializer, EventSerializer, AttendeeSerializer, RegistrationSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView

# Create your views here.
# viewsets
class VenueViewSet(ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class OrganizerViewSet(ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

# generic views
class EventListCreate(ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# mixins
class RegistrationListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get(self, request, **kwargs):
        return self.list(request, **kwargs)
    
    def post(self, request, **kwargs):
        return self.create(request, **kwargs)

class RegistrationDetail(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get(self, request, **kwargs):
        return self.retrieve(request, **kwargs)
    
    def put(self, request, **kwargs):
        return self.update(request, **kwargs)