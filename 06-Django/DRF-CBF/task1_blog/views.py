from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import Blog
from .serializers import BlogSerializer

# Create your views here.

# class PostList(APIView):
#     def get(self,request):
#         posts = Blog.objects.all()
#         serializer = BlogSerializer(posts,many=True)
#         return Response(serializer.data)

class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer()

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer()