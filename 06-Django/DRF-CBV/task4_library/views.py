from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from .models import Author, Publisher, Book, Member, Borrowing
from .serializers import AuthorSerializer, PublisherSerializer, BookSerializer, MemberSerializer, BorrowingSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView

# Create your views here.

# VewSets
class AuthorViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class PublisherViewSet(ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

# generic views
class BookListCreate(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

# APIView
class MemberListCreate(APIView):
    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializerk.data, status=status.HTTP_201_CREATED)

# mixins
class MemberDetail(RetrieveModelMixin,UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get(self, request, **kwargs):
        return self.list(request, **kwargs)
    
    def post(self, request, **kwargs):
        return self.create(request, **kwargs)

class BorrowingListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer
    
    def get(self, request, **kwargs):
        return self.list(request, **kwargs)
    
    def post(self, request, **kwargs):
        return self.create(request, **kwargs)

class BorrowingDetail(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer

    def get(self, request, **kwargs):
        return self.retrieve(request, **kwargs)
    
    def put(self, request, **kwargs):
        return self.update(request, **kwargs)

