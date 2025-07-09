from django.shortcuts import render, get_object_or_404
from .serializers import BlogSerializer
from .models import Blog
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET','POST'])
def blogView(request):

    if request.method == 'POST':
        data = request.data
        serializer = BlogSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    else:
        queryset = Blog.objects.all()
        serializer = BlogSerializer(queryset,many=True)

        return Response(serializer.data)

@api_view(['GET','PATCH','DELETE'])
def updateBlog(request,id):

    blog = get_object_or_404(Blog, pk=id)
    print("Found Blog",blog)

    if request.method == 'DELETE':
        blog.delete()
        return Response("Deleted successfully")
    elif request.method == 'PATCH':
        data = request.data
        print("Data received:",data)
        serializer = BlogSerializer(data = data,instance=blog,partial=True)
        if serializer.is_valid():
            updated_data = serializer.save()
            return Response(updated_data)
        else:
            return Response("Bad request not valid data")
    else:
        serializer = BlogSerializer(blog)
        return Response(serializer.data)