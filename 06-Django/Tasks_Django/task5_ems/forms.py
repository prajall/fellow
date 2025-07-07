from django import forms
from .models import Registration, Event

class RegistrationForm(forms.ModelForm):
    class Meta:
        model= Registration
        fields= ['attendee']
        widgets={
           
            'attendee':forms.Select(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
        }   

class EventForm(forms.ModelForm):
    class Meta:
        model= Event
        fields = ['title','description','venue','organizer','start_time',
                  'end_time']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200',
            }),
            'description': forms.Textarea(attrs={
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 h-32',
            }),
            'venue': forms.Select(attrs={
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200'
            }),
            'organizer': forms.Select(attrs={
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200'
            }),
            'start_time': forms.DateTimeInput(attrs={
                'type': 'datetime-local', 
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200'
            }),
            'end_time': forms.DateTimeInput(attrs={
                'type': 'datetime-local', 
                'class': 'w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200'
            }),
            
        }