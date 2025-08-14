from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.
ROLECHOICES = [
    ('admin','Admin'),
    ('customer','Customer')
]

class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        
        user = self.model(email = email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)

        superuser = self.create_user(email,password, **extra_fields)
        return superuser
        
class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=200, default="User")
    profile_image = models.ImageField(upload_to='profile_images/', default='/media/profile_images/default.jpg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
   
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @property
    def is_admin(self):
        print("Role = ",self.role)
        return self.role=="admin"

    def __str__(self):
        return f"{self.id} {self.email}"
    
