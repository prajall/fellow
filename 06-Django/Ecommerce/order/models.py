from django.db import models
from product.models import Product
from user.models import User


ORDER_STATUS = [
    ('pending','Pending'),
    ('confirmed','Confirmed'),
    ('cancelled','Cancelled'),
    ('delivered','Delivered')
]

# Create your models here.
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    status = models.CharField(choices=ORDER_STATUS, default='pending')

    