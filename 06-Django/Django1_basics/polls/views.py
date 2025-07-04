from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from .models import Question
from django.template import loader

# Create your views here.
# def index(request):
#     latest_questions_list = Question.objects.order_by('pub_date')
#     result = ", ".join([q.question_text for q in latest_questions_list])
#     print(result)
        
#     # print(latest_questions_list)
#     return HttpResponse(result)

def index(request):
    print(request)
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    # json = [q for q in latest_question_list]
    # print(type(json))
    # template = loader.get_template("polls/index.html")
    context = {"latest_question_list": latest_question_list}
    return render(request,"polls/index.html",context)
    # return JsonResponse({"questions":json})

def detail(request, question_id):
    # return HttpResponse("You are viewing detail of %s" % question_id)
    question_detail = Question.objects.get(id=1)
    print(type(question_detail))
    # return render(request, "polls/detail.html",{"question_detail" :question_detail})
    return HttpResponseRedirect("/login")

def results(request,question_id):
    response = "You are viewing resultof question %s"
    return HttpResponse(response % question_id)

def vote (request, question_id):
    return HttpResponse("You're voting on question: %s" % question_id)


