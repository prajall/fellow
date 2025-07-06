from django import forms
from .models import Book, Member, Burrow


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'isbn', 'author', 'publisher', 'publication_date']

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['name', 'email', 'membership_date']

class BurrowForm(forms.ModelForm):
    class Meta:
        model = Burrow
        fields = ['book', 'member', 'borrow_date', 'return_date', 'is_returned']