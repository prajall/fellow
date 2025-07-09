from django.urls import path
from . import views

app_name = 'school_management'
urlpatterns = [
    path('student/', views.create_student, name='create_student'),
    path('enrollment/student', views.enroll_student, name='enroll_student'),
    path('enrollment/list/', views.view_enrollment, name='view_enrollment'),
    path('enrollment/delete/<int:id>/', views.remove_enrollment, name='remove_enrollment'),
] 
