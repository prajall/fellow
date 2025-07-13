from django.urls import path, include
from .views import DepartmentViewSet, CourseListCreate, CourseDetail, StudentListCreate, StudentDetail, EnrollmentListCreate, EnrollmentDetail
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'department', DepartmentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("course/", CourseListCreate.as_view()),
    path("course/<int:pk>", CourseDetail.as_view()),
    path("student/", StudentListCreate.as_view()),
    path("student/<int:pk>", StudentDetail.as_view()),
    path("enrollment/", EnrollmentListCreate.as_view()),
    path("enrollment/<int:pk>", EnrollmentDetail.as_view()),
]