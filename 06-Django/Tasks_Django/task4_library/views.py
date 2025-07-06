from django.shortcuts import render, redirect
from .models import Book, Member, Burrow
from .forms import BookForm, MemberForm

# Create your views here.
def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task4_library:book_list')
    else:
        form = BookForm()
    return render(request, 'task4_library/book_form.html', {'form': form})

def book_list(request):
    books = Book.objects.all()
    return render(request, 'task4_library/book_list.html', {'books': books})

def book_detail(request, book_id):
    book = Book.objects.get(id=book_id)
    return render(request, 'task4_library/book_detail.html', {'book': book})

def member_create(request):
    if request.method == 'POST':
        form = MemberForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task4_library:member_list')
    else:
        form = MemberForm()
        return render(request, 'task4_library/member_form.html', {'form': form})

def member_list(request):
    try:
        members = Member.objects.all()
        return render(request, 'task4_library/member_list.html', {'members': members})
    except Exception as e:
        print("error fetching members", e)
        return render(request, 'task4_library/member_list.html', {'members': []})