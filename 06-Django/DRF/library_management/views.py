from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .serializers import AuthorSerializer, PublisherSerializer, BookSerializer, MemberSerializer, BorrowingSerializer
from .models import Author, Publisher, Book, Member, Borrowing
from school_management.apiResponse import apiResponse, apiError

@api_view(['POST', 'GET'])
def book_list_create(request):
    if request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            book = serializer.save()
            return apiResponse(201, "Book created successfully", BookSerializer(book).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return apiResponse(200, "All Books Retrieved", serializer.data)

@api_view(['GET', 'PATCH', 'DELETE'])
def book_detail(request, id):
    book = get_object_or_404(Book, pk=id)
    if request.method == 'PATCH':
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            book = serializer.save()
            return apiResponse(200, "Book updated successfully", BookSerializer(book).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    elif request.method == 'DELETE':
        book.delete()
        return apiResponse(200, "Book deleted successfully", {})
    serializer = BookSerializer(book)
    return apiResponse(200, "Book detail fetched successfully", serializer.data)

@api_view(['POST', 'GET'])
def member_list_create(request):
    if request.method == 'POST':
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            member = serializer.save()
            return apiResponse(201, "Member created successfully", MemberSerializer(member).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return apiResponse(200, "All Members Retrieved", serializer.data)

@api_view(['GET', 'PATCH', 'DELETE'])
def member_detail(request, id):
    member = get_object_or_404(Member, pk=id)
    if request.method == 'PATCH':
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            member = serializer.save()
            return apiResponse(200, "Member updated successfully", MemberSerializer(member).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    elif request.method == 'DELETE':
        member.delete()
        return apiResponse(200, "Member deleted successfully", {})
    serializer = MemberSerializer(member)
    return apiResponse(200, "Member detail fetched successfully", serializer.data)

@api_view(['POST', 'GET'])
def borrowing_list_create(request):
    if request.method == 'POST':
        serializer = BorrowingSerializer(data=request.data)
        if serializer.is_valid():
            borrowing = serializer.save()
            return apiResponse(201, "Borrowing created successfully", BorrowingSerializer(borrowing).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    borrowings = Borrowing.objects.all()
    serializer = BorrowingSerializer(borrowings, many=True)
    return apiResponse(200, "All Borrowings Retrieved", serializer.data)

@api_view(['GET', 'PATCH', 'DELETE'])
def borrowing_detail(request, id):
    borrowing = get_object_or_404(Borrowing, pk=id)
    if request.method == 'PATCH':
        serializer = BorrowingSerializer(borrowing, data=request.data, partial=True)
        if serializer.is_valid():
            borrowing = serializer.save()
            return apiResponse(200, "Borrowing updated successfully", BorrowingSerializer(borrowing).data)
        else:
            return apiError(400, "Validation error", serializer.errors)
    elif request.method == 'DELETE':
        borrowing.delete()
        return apiResponse(200, "Borrowing deleted successfully", {})
    serializer = BorrowingSerializer(borrowing)
    return apiResponse(200, "Borrowing detail fetched successfully", serializer.data)

@api_view(['GET'])
def active_borrowings(request):
    borrowings = Borrowing.objects.filter(is_returned=False)
    serializer = BorrowingSerializer(borrowings, many=True)
    return apiResponse(200, "Active borrowings fetched successfully", serializer.data)

@api_view(['POST'])
def mark_as_returned(request, id):
    borrowing = get_object_or_404(Borrowing, pk=id)
    borrowing.is_returned = True
    borrowing.save()
    return apiResponse(200, "Borrowing marked as returned", BorrowingSerializer(borrowing).data)
