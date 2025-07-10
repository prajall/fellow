from rest_framework import serializers
from .models import Registration, Venue, Organizer, Event, Attendee

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id','name','address']

class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = ['id','name','company','email']

class EventDetailSerializer(serializers.ModelSerializer):
    venue = VenueSerializer()
    organizer = OrganizerSerializer()

    class Meta:
        model = Event
        fields = "__all__"

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = "__all__"

class RegistrationSerializer(serializers.ModelSerializer):
    event = EventDetailSerializer()
    class Meta:
        model = Registration
        fields = "__all__"

class EventAttendeeSerializer(serializers.ModelSerializer):
    attendee = AttendeeSerializer()

    class Meta:
        model = Registration
        fields = ["attendee"]
