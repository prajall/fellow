from django.shortcuts import render
from django.forms.models import model_to_dict 
from django.http import HttpResponseBadRequest, HttpResponse
from .models import Event, Registration

# Create your views here.
def event_list(request):
    events = Event.objects.order_by('-start_time').all()
    return render(request, 'task5_ems/event_list.html',{"events":events})

def event_detail(request,event_id):
    if not id:
        return HttpResponseBadRequest()
    try:
        event = Event.objects.select_related('venue','organizer').get(pk=event_id)
        attendees = Registration.objects.filter(event=event_id).select_related('attendee').all()
        total_attendees = attendees.count();

        print("Event")
        print(model_to_dict(event))
        print("Total:", total_attendees)
        print("Attendees:")
        for a in attendees:
            print(model_to_dict(a))

        context = {"event":event, "attendees":attendees, "total_attendees":total_attendees}

        return render(request, 'task5_ems/event_detail.html', context )
    except Exception as e:
        print(e)
        return HttpResponse("Internal Server Error")