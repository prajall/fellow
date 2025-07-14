from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import mixins
from .models import Blog
from .serializers import BlogSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly
from rest_framework import status
from rest_framework import permissions


# Create your views here.

# API view
class BlogListAPI(APIView):

    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self,request):
        posts = Blog.objects.all()
        serializer = BlogSerializer(posts,many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.is_authenticated:
            return Response("Please login")
        data = request.data
        
        serializer = BlogSerializer(data = data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Invalid serializer")

class BlogDetailAPI(APIView):

    def get_object(self,pk):
        post = get_object_or_404(Blog,pk=pk)
        return post

    def get(self, request, pk):
        postInstance = self.get_object(pk)
        serializer = BlogSerializer(postInstance)
        return Response(serializer.data)
     
    def patch(self, request,pk):
        postInstance = self.get_object(pk)
        data = request.data
        serializer = BlogSerializer(data = data,instance = postInstance, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self,request,pk):
        postInstance = self.get_object(pk)
        postInstance.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

# Mixins
class BlogMixinView(mixins.CreateModelMixin, mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
    def get(self, request, **kwargs):
        return self.list(request,**kwargs)

    def post(self, request,**kwargs):
        return self.create(request,**kwargs)

class BlogDetailMixin(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
    def get(self,request,pk,**kwargs):
        return self.retrieve(request,**kwargs)
    
    def put(self, request,**kwargs):
        return self.update(request, **kwargs)

    def patch(self,request,**kwargs):
        return self.update(request, **kwargs, partial=True)
    
    def delete(self,request,**kwargs):
        return self.destroy(request, **kwargs)

# Generic view
class BlogListGeneric(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly ]

    def perform_create(self, serializers):
        serializers.save(owner=self.request.user)

class BlogDetailGeneric(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

# ViewSet
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializers):
        # serializers.save(owner=self.request.user)

# For Permissions
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
