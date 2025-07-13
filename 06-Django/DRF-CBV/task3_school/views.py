from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Department, Course, Student, Enrollment
from .serializers import DepartmentSerializer, CourseSerializer, StudentSerializer, EnrollmentSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView
# Create your views here.

#  ViewSets
class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# Generic Views
class CourseListCreate(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetail(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class StudentListCreate(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetail(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

#  mixins
class EnrollmentListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get(self, request, **kwargs):
        self.list(request, **kwargs)

    def post(self, request, **kwargs):
        enrollment = Enrollment.objects.get(student=request.data.get('student'), course=request.data.get('course'))
        if enrollment:
            return Response({"error": "Enrollment already exists"}, status=status.HTTP_400_BAD_REQUEST)
        self.create(request, **kwargs)

class EnrollmentDetail(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get(self, request, **kwargs):
        self.retrieve(request, **kwargs)

    def put(self, request, **kwargs):
        self.update(request, **kwargs)

    def delete(self, request, **kwargs):
        self.destroy(request, **kwargs)