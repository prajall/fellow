from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'brand', 'category','image']
        widgets = {
            'name': forms.TextInput(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            }),
            'description': forms.Textarea(attrs={
                "class": "w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            }),
            'price': forms.NumberInput(attrs={
                "class": " px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            }),
            'brand': forms.Select(attrs={
                "class": "w-48 py-2 px-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            }),
            'category': forms.Select(attrs={
                "class": "w-48 py-2 px-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            }),
        }
