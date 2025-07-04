from django.db import models

# Create your models here.
class Tweet(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __init__(self):
        return self.title

class Comment(models.Model):
    comment = models.CharField()
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)

    def __init__(self):
        return self.comment