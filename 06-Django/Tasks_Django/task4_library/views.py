from django.shortcuts import render, redirect, get_object_or_404
from .models import Book, Member, Burrow
from .forms import BookForm, MemberForm, BurrowForm
from datetime import datetime


# Create your views here.


def home(request):
    burrows = Burrow.objects.order_by('-created_at').all()[:10]
    members = Member.objects.all()[:8]
    books = Book.objects.all()[:10]

    return render(request, 'task4_library/home.html', {'burrows': burrows, 'members': members,'books':books})

def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task4_library:book_list')
        else:
            print("form not valid")
            form = BookForm()
            return render(request, 'task4_library/book_form.html', {'form': form})
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


def burrow_create(request):
    if request.method == 'POST':
        form = BurrowForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task4_library:burrow_list')
    else:
        form = BurrowForm()
    return render(request, 'task4_library/burrow_form.html', {'form': form})

def burrow_list(request):

    member_id = request.GET.get("member", "")
    is_returned = request.GET.get('is_returned')

    print(is_returned)


    burrows = Burrow.objects.all()
    members = Member.objects.all()

    if member_id:
        burrows=burrows.filter(member=int(member_id))
    if is_returned=='true':
        burrows=burrows.filter(is_returned=True)
    if is_returned=='false':
        burrows=burrows.filter(is_returned=False)

    today = datetime.now().date()
    return render(request, 'task4_library/burrow_list.html', {'burrows': burrows, 'today': today,"members":members})  


def burrow_return(request,id):
    burrow_model = get_object_or_404(Burrow,pk=id)
    print("model found",burrow_model,request.method)

    if request.method == 'POST':
        burrow_model.is_returned = True
        burrow_model.save()
        return redirect('task4_library:burrow_list')
    else:
        return redirect('task4_library:burrow_list')
