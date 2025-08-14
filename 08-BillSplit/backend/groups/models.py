from django.db import models
from users.models import User

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100)
    group_image = models.ImageField(upload_to='group_images/', default="/media/group_images/default.jpg", null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='owned_groups', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} {self.name}"


class GroupMember(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name='joined_groups')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="members")
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invited_groups')
    joined = models.BooleanField(default=False)
    joined_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('member', 'group')
    
    def __str__(self):
        return f"{self.group.name} - {self.member.name}"