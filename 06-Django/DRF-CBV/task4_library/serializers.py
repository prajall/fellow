from rest_framework import serializers
from .models import Author, Publisher, Book, Member, Borrowing

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    publisher = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    class Meta:
        model = Book
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class BorrowingSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()
    member = serializers.StringRelatedField()

    class Meta:
        model = Borrowing
        fields = '__all__' 