from django import forms
from .models import Student, Department, Course, Enrollment

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['name', 'email', 'enrollment_date', 'department']
        widgets = {
            'name': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'email': forms.EmailInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'enrollment_date': forms.DateInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type": "date"
            }),
            'department': forms.Select(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
        }

class DepartmentForm(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name', 'code', 'hod']
        widgets = {
            'name': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'code': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'hod': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
        }

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'code', 'credits', 'department']
        widgets = {
            'title': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'code': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'credits': forms.NumberInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'department': forms.Select(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
        }

class EnrollmentForm(forms.ModelForm):
    class Meta:
        model = Enrollment
        fields = ['student', 'course', 'enrollment_date', 'grade']
        widgets = {
            'student': forms.Select(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'course': forms.Select(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'enrollment_date': forms.DateInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type": "date"
            }),
            'grade': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
        }