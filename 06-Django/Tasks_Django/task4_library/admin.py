from django.contrib import admin
from .models import Author, Publisher, Book, Member, Burrow

# Register your models here.
@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'nationality', 'dob']

@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'contact_info']

@admin.register(Book)  
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'isbn', 'author', 'publisher', 'publication_date']

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'membership_date']

@admin.register(Burrow)
class LoanAdmin(admin.ModelAdmin):
    list_display = ['book', 'member', 'borrow_date', 'return_date', 'is_returned']