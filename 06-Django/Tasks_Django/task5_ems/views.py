from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.forms.models import model_to_dict 
from django.http import HttpResponseBadRequest, HttpResponse, HttpResponseRedirect
from .models import Event, Registration
from .forms import RegistrationForm, EventForm, AttendeeForm

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
    
def event_add(request):
    if request.method=='POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()

            
            return HttpResponseRedirect(reverse('task5_ems:event_list'))


    form = EventForm()
    return render(request, "task5_ems/event_form.html",{"form":form})

def event_edit(request,event_id):

    if request.method=='POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('task5_ems:event_list'))
        
    else:  
        event = get_object_or_404(Event, pk=event_id)
        form = EventForm(instance = event)
        return render(request, "task5_ems/event_form.html",{"form":form})

def register_attendee(request,event_id):
    event = get_object_or_404(Event, pk=event_id )
    if request.method == 'POST':
        try:
            form = AttendeeForm(request.POST)
            # print(form)
            if form.is_valid():
                attendee = form.save();
                response = Registration.objects.create(event=event,attendee=attendee)
                print("New Registration:",response)
                redirect_url = reverse("task5_ems:event_detail", kwargs={"event_id":event_id})
                return HttpResponseRedirect(redirect_url)
            else:
                print("Form Invalid")
                return HttpResponseBadRequest()
        except Exception as e:
            print("Error Registering attendee",e)
            return HttpResponseBadRequest()
    
    else:
        event = get_object_or_404(Event, pk=event_id)
        event_title = event.title
        form = AttendeeForm()
        return render(request, 'task5_ems/registration_form.html',{"form":form,"event_id":event_id,"event_title":event_title})


def cancel_registration(request,id):
    if request.method == 'POST':
        registration = get_object_or_404(Registration, pk=id)
        registration.delete()
        return HttpResponseRedirect(reverse('task5_ems:event_detail', kwargs={'event_id':registration.event.id}))
    else:
        return HttpResponseRedirect(reverse('task5_ems:event_list'))