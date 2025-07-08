from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only = True)
    title = serializers.CharField(max_length = 200)
    description = serializers.CharField(max_length = 2000)

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title',instance.title)
        instance.description = validated_data.get('description',instance.description)
        instance.save()
        return instance 