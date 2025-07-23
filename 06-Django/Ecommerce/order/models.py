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

class Order (models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    total_price = models.DecimalField(decimal_places=2, max_digits=10)
    status = models.CharField(choices=ORDER_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name = "items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)