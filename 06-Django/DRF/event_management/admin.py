from django.contrib import admin
from .models import Registration, Venue, Organizer, Event, Attendee
# Register your models here.
admin.site.register(Venue)
admin.site.register(Organizer)
admin.site.register(Event)
admin.site.register(Attendee)

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ['event']


