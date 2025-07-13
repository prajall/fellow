from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    capacity = models.IntegerField()
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Organizer(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
    organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}-{self.start_time }"

class Attendee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    # event = models.ForeignKey(Event, on_delete=models.CASCADE, )
    
    def __str__(self):
        return self.name

STATUS_CHOICE = [
    ('upcomming','Upcomming'),
    ('running','Running'),
    ('completed','Completed'),
    ('cancelled','Cancelled'),
]

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    attendee = models.ForeignKey(Attendee, on_delete=models.CASCADE)
    registration_date = models.DateField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICE, default="upcomming")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.attendee.name}-{self.event.title}"
