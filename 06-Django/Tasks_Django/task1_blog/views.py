from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect 
from django.http import HttpResponseBadRequest
from django.urls import reverse
from django.forms.models import model_to_dict
from .forms import BlogForm
from .models import Post
from .models import Author
from .models import Category

# Create your views here.
def home_view(request):
    author_id = request.GET.get('author')
    category_id = request.GET.get('category')
    print(author_id, category_id)
    try:
        posts = Post.objects.select_related('author','category').order_by('-created_at').all();
        # for p in posts:
        #     print(model_to_dict(p))
        if author_id:
            posts = posts.filter(author = int(author_id))
        if category_id:
            posts = posts.filter(category= int(category_id))
        

        all_authors = Author.objects.all()
        all_categories = Category.objects.all()

    except Exception as e:
        print("Error in home view: ",e)
        return HttpResponse("Internal Server Error")

    else:
        return render(request, 'task1_blog/home.html', {'posts':posts,"authors":all_authors,"categories":all_categories})

def detail_view(request,id):

    try:
        post = Post.objects.get(id=id)

    except Exception as e:
        print("Error in home view: ",e)
        return HttpResponse("Internal Server Error")

    else:
        return render(request, 'task1_blog/detail.html', {'post':post})

def post_blog(request):

    if request.method=='GET':
        return render(request,'task1_blog/post_form.html',{"form":BlogForm})

    if request.method == 'POST':
        form = BlogForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("task1_blog:home_view"))
        else:
            return HttpResponseBadRequest
        
def edit_blog(request,id):
    post = get_object_or_404(Post,pk=id)
    if request.method=='GET':
        return render(request,'task1_blog/post_form.html',{"form":BlogForm(instance=post)})

    if request.method == 'POST':
        form = BlogForm(request.POST,instance=post)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("task1_blog:detail", args=[post.id]))
        else:
            return HttpResponseBadRequest
        
def delete_blog(request,id):
    post = get_object_or_404(Post,pk=id)
    if request.method == 'POST':
        post.delete()
        return HttpResponseRedirect(reverse("task1_blog:home_view"))
    else:
        return HttpResponse('Internal Server Error')
