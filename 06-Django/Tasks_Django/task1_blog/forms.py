from django import forms
from .models import Post

class BlogForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author', 'category']
        widgets = {
            'title': forms.TextInput(attrs={
                "class": "w-full p-3 mb-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            }),
            'content': forms.Textarea(attrs={
                "class": "w-full p-3 mb-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500",
            }),
            'author': forms.Select(attrs={
                "class": "w-48 py-2 px-3 mb-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            }),
            'category': forms.Select(attrs={
                "class": " w-48 py-2 px-3 mb-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            }),
        }
