from django.db import models
from groups.models import Group
from users.models import User
from django.core.validators import MaxValueValidator


# Create your models here.
class ExpenseModel(models.Model):
    title = models.CharField(max_length=100)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
    total_amount = models.PositiveIntegerField(validators=[MaxValueValidator(9999999999)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class ExpenseParticipant(models.Model):
    expense_id = models.ForeignKey(ExpenseModel, on_delete=models.CASCADE, related_name='participants')

    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    paid_amount = models.PositiveIntegerField(validators=[MaxValueValidator(9999999999)])
    allocated_amount = models.PositiveIntegerField(validators=[MaxValueValidator(9999999999)])
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_id.email} - {self.expense_id.title}"