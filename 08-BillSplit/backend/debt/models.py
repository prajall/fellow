from django.db import models
from django.contrib.auth.models import User
from groups.models import Group


class Debt(models.Model):
    user_a = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debts')
    user_b = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debts')
    # here positive amount means user_a owes user_b
    # negative amount means user_b owes user_a
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.amount > 0:
            return f"{self.user_a.name} owes {self.user_b.name} Rs.{abs(self.amount)}"
        else:
            return f"{self.user_b.name} owes {self.user_a.name} Rs.{abs(self.amount)}"