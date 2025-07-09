from rest_framework.response import Response 
from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from .serializers import StudentSerializer, EnrollmentSerializer
from .apiResponse import apiResponse,apiError
from .models import Student, Department, Course, Enrollment


# Create your views here.

# def home_view(request):
#     try:
#         students = Student.objects.all()[:5]
#         departments = Department.objects.all()[:5]
#         courses = Course.objects.all()[:5]
#         return render(request, 'task3_sms/home_view.html', {'students': students, 'departments': departments, 'courses': courses})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

@api_view(['POST','GET'])
def create_student(request):
    if request.method == 'POST':
        data = request.data
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            newStudent = serializer.save()
            return apiResponse(201, "Student created successfully",StudentSerializer(newStudent).data)
        
        else:
            return apiError(400,"Validation error",serializer.errors)
        
    elif request.method == 'GET':
        all_students = Student.objects.all()[:10]
        serializer = StudentSerializer(all_students,many=True)
        return apiResponse(200,"All Students Retrived",serializer.data)
    
@api_view(['POST','GET'])
def enroll_student(request):
    if request.method == 'POST':
        data = request.data
        serializer = EnrollmentSerializer(data = data)
        if serializer.is_valid():
            new_enrollment = serializer.save()
            return apiResponse(201, "Enrollment created successfully",EnrollmentSerializer(new_enrollment).data)
        else:
            return apiError(400,"Validation error",serializer.errors)

    elif request.method == 'GET':
        all_enrollments = Enrollment.objects.all()
        serializer = EnrollmentSerializer(all_enrollments,many=True)
        return apiResponse(200,"All Enrollment Retrived",serializer.data)
    
@api_view(['GET','PATCH','DELETE'])
def student_detail(request,id):
    queryset = get_object_or_404(Student,pk=id)

    if request.method == 'PATCH':
        data = request.data
        serializer = StudentSerializer(queryset,data = data,partial=True)
        if serializer.is_valid():
            saved = serializer.save()
            return apiResponse(200, "Updated successfully",StudentSerializer(saved).data)
        else:
            return apiError(400,"Validation failed",serializer.errors)
    
    elif request.method == 'DELETE':
        queryset.delete()
        return apiResponse(200,"Deleted Successfully",{})

    else:
        data = StudentSerializer(queryset)
        print("product detail:",data.data)
        return apiResponse(200,"Product detail fetched successfully",data.data)

@api_view(['GET'])
def view_enrollment(request):
    enrollments = Enrollment.objects.select_related('student','course').all()
    serializer = EnrollmentSerializer(enrollments,many=True)
    return apiResponse(200,"Enrollment detail fetched successfully",serializer.data)


@api_view(['DELETE'])
def remove_enrollment(request,id):
    enrollment = get_object_or_404(Enrollment,pk=id)
    enrollment.delete()
    return apiResponse(200,"Enrollment deleted successfully",{})



# def student_list(request):
#     try:
#         students = Student.objects.all()
#         return render(request, 'task3_sms/student_list.html', {'students': students})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def create_department(request):
#     if request.method == 'POST':
#         form = DepartmentForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:department_list')
#     else:
#         form = DepartmentForm()
#     return render(request, 'task3_sms/department_form.html', {'form': form})
    
# def department_list(request):
#     try:
#         departments = Department.objects.all()
#         return render(request, 'task3_sms/department_list.html', {'departments': departments})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def delete_department(request, department_id):
#     try:
#         department = Department.objects.get(id=department_id)
#         department.delete()
#         return redirect('task3_sms:department_list')
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def edit_department(request, department_id):
#     if request.method == 'POST':
#         form = DepartmentForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:department_list')

# def create_course(request):
#     if request.method == 'POST':
#         form = CourseForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:course_list')
#         else:
#             print("Error in form validation", form.errors)
#             return HttpResponseBadRequest("Error in form validation")
#     else:
#         form = CourseForm()
#         return render(request, 'task3_sms/course_form.html', {"form":form})

# def course_list(request):
#     try:
#         courses = Course.objects.all()
#         return render(request, 'task3_sms/course_list.html', {'courses': courses})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")
    
# def delete_course(request, course_id):
#     try:
#         course = Course.objects.get(id=course_id)
#         course.delete()
#         return redirect('task3_sms:course_list')
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def edit_course(request, course_id):
#     if request.method == 'POST':
#         form = CourseForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:course_list')
#     try:
#         course = Course.objects.get(id=course_id)
#         return render(request, 'task3_sms/course_form.html', {'form': CourseForm(instance =course), 'is_edit': True})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def delete_student(request, student_id):
#     try:
#         student = Student.objects.get(id=student_id)
#         student.delete()
#         return redirect('task3_sms:student_list')
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def edit_student(request, student_id):
#     if request.method == 'POST':
#         form = StudentForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:student_list')
#     try:
#         student = Student.objects.get(id=student_id)
#         return render(request, 'task3_sms/student_form.html', {'form': StudentForm(instance=student), 'is_edit': True})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")

# def create_enrollment(request):
#     if request.method == 'POST':
#         form = EnrollmentForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('task3_sms:enrollment_list')
#     else:
#         form = EnrollmentForm()
#         return render(request, 'task3_sms/enrollment_form.html', {'form': form})

# def view_enrollment(request):
#     try:
#         enrollments = Enrollment.objects.select_related('student','course').all()
#         return render(request, 'task3_sms/enrollment_list.html', {'enrollments': enrollments})
#     except Exception as e:
#         print(e)
#         return HttpResponse("Internal Server Error")