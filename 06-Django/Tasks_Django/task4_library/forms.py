from django import forms
from .models import Book, Member, Burrow


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'isbn', 'author', 'publisher', 'publication_date']
        widgets = {
            'title':forms.TextInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'isbn':forms.TextInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'author':forms.Select(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'publisher':forms.Select(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),
            'publication_date':forms.DateInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type":"date"
            }),
        }

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['name', 'email', 'membership_date']
        widgets = {
            'name':forms.TextInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),        
            'email':forms.EmailInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),        
            'membership_date':forms.DateInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type":"date"
            }),        
        }
        

class BurrowForm(forms.ModelForm):
    class Meta:
        model = Burrow
        fields = ['book', 'member', 'borrow_date', 'return_date', 'is_returned']
        widgets = {
            'book':forms.Select(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),        
            'member':forms.Select(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
            }),        
            'borrow_date':forms.DateInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type":"date"
            }),      
            'return_date':forms.DateInput(attrs={
                "class":"w-full px-2 py-2 mb-3 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-200",
                "type":"date"
            }),        
            'is_returned':forms.CheckboxInput(attrs={
                "class":"",
            }),        
        }

    