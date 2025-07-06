from django.urls import path
from . import views

app_name = 'task3_sms'
urlpatterns = [
    path('', views.home_view, name='home'),
    path('student/create/', views.create_student, name='create_student'),
    path('student/list/', views.student_list, name='student_list'),
    path('student/delete/<int:student_id>/', views.delete_student, name='delete_student'),
    path('student/edit/<int:student_id>/', views.edit_student, name='edit_student'),
    path('department/create/', views.create_department, name='create_department'),
    path('department/list/', views.department_list, name='department_list'),
    path('department/delete/<int:department_id>/', views.delete_department, name='delete_department'),
    path('department/edit/<int:department_id>/', views.edit_department, name='edit_department'),
    path('course/create/', views.create_course, name='create_course'),
    path('course/list/', views.course_list, name='course_list'),
    path('course/delete/<int:course_id>/', views.delete_course, name='delete_course'),
    path('course/edit/<int:course_id>/', views.edit_course, name='edit_course'),
    path('enrollment/create/', views.create_enrollment, name='create_enrollment'),
    path('enrollment/list/', views.view_enrollment, name='view_enrollment'),
] 
