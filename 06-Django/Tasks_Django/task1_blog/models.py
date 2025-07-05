from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.CharField(null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.category


class Post(models.Model):
    title = models.CharField()
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title