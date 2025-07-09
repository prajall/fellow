from django.shortcuts import render, get_object_or_404
from .serializers import TodoSerializer
from .models import Todo
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET','POST'])
def todoView(request):

    if request.method == 'POST':
        data = request.data
        serializer = TodoSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    else:
        queryset = Todo.objects.all()
        serializer = TodoSerializer(queryset,many=True)

        return Response(serializer.data)

@api_view(['GET','PATCH','DELETE'])
def updateTodo(request,id):

    todo = get_object_or_404(Todo, pk=id)
    if request.method == 'DELETE':
        todo.delete()
        return Response("Deleted successfully")
    elif request.method == 'UPDATE':
        print("Found todo",todo)
        data = request.data
        print("Data received:",data)
        serializer = TodoSerializer(data = data,instance=todo,partial=True)
        if serializer.is_valid():
            updated_data = serializer.save()
            return Response(updated_data)
        else:
            return Response("Bad request not valid data")
    else:
        serializer = TodoSerializer(todo)
        return Response(serializer.data)