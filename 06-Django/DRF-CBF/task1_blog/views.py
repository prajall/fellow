from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import Blog
from .serializers import BlogSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly

# Create your views here.

# class PostList(APIView):
#     def get(self,request):
#         posts = Blog.objects.all()
#         serializer = BlogSerializer(posts,many=True)
#         return Response(serializer.data)

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializers):
        serializers.save(owner=self.request.user)

class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly ]

    def perform_create(self, serializers):
        serializers.save(owner=self.request.user)

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
