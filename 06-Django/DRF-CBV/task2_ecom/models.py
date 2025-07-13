from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    country = models.CharField()

    def __str__(self):
        return self.name

class Category(models.Model):
    category = models.CharField(max_length=50)
    parent_category = models.ForeignKey('self',on_delete=models.SET_NULL, null=True,blank=True,related_name='subcategories')
    

    def __str__(self):
        return self.category
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    brand = models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True,blank=True)
    category= models.ForeignKey(Category,on_delete=models.SET_NULL, null=True,blank=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name