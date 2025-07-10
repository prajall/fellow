from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event, Registration, Attendee
from .apiResponse import apiResponse, apiError
from .serializers import EventSerializer, AttendeeSerializer, EventAttendeeSerializer, RegistrationSerializer, EventDetailSerializer

# Create your views here.
@api_view(["GET", "POST"])
def events(request):

    if request.method == "GET":
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return apiResponse(status.HTTP_200_OK, "Events fetched successfully", serializer.data)
    elif request.method == "POST":
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return apiResponse(status.HTTP_201_CREATED, "Event created successfully", serializer.data)
        return apiError(status.HTTP_400_BAD_REQUEST, "Event creation failed", serializer.errors)
    
@api_view(["GET"])
def event_detail(request, pk):

    if request.method == 'PATCH':
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return apiResponse(status.HTTP_200_OK, "Event updated successfully", serializer.data)
        return apiError(status.HTTP_400_BAD_REQUEST, "Event update failed", serializer.errors)

    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return apiError(status.HTTP_404_NOT_FOUND, "Event not found")
    
    if request.method == "GET":
        return apiResponse(status.HTTP_200_OK, "Event fetched successfully", EventSerializer(event).data)

@api_view(["POST","GET"])
def attendees(request,event_id):
    event = get_object_or_404(Event, pk=event_id )
    if request.method == 'POST':
        try:
            serializer = AttendeeSerializer(data=request.data)
            if serializer.is_valid():
                attendee = serializer.save();
                response = Registration.objects.create(event=event,attendee=attendee)
                print("New Registration:",response)
                return apiResponse(status.HTTP_200_OK, "Attendee registered successfully", RegistrationSerializer(response).data)
            else:
                print("Form Invalid")
                return apiError(status.HTTP_400_BAD_REQUEST, "Form Invalid", serializer.errors)
        except Exception as e:
            print("Error Registering attendee",e)
            return apiError(status.HTTP_500_INTERNAL_SERVER_ERROR, "Error Registering attendee", e)
    
    else:
        # get event detail
        eventDetail = Event.objects.select_related("venue","organizer").get(pk=event_id)
        event_serializer = EventDetailSerializer(eventDetail)
        # get attendees of the event
        attendees = Attendee.objects.filter(registration__event=event_id).all()
        attendee_serializer = AttendeeSerializer(attendees, many=True)
        data = {
            "event":event_serializer.data,
            "attendees":attendee_serializer.data
        }
        return apiResponse(status.HTTP_200_OK, "Attendee Fetched successfully", data)

@api_view(["DELETE"])
def cancel_attendee_registration(request,event_id,attendee_id):
    # event = get_object_or_404(Event, pk=event_id)
    # attendee = get_object_or_404(Attendee, pk=attendee_id)
    try:
        registration = get_object_or_404(Registration, event=event_id, attendee=attendee_id)
        registration.delete()
        return apiResponse(status.HTTP_200_OK, "Attendee registration cancelled successfully")
    except Exception as e:
        print("Error cancelling attendee registration",e)
        return apiError(status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal Server Error", e)