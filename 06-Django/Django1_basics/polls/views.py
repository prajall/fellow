from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.forms.models import model_to_dict
from .models import Question
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.
# def index(request):
#     latest_questions_list = Question.objects.order_by('pub_date')
#     result = ", ".join([q.question_text for q in latest_questions_list])
#     print(result)
        
#     # print(latest_questions_list)
#     return HttpResponse(result)

def index(request):

    # print(request)
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    # json = [q for q in latest_question_list]
    # print(type(json))
    # template = loader.get_template("polls/index.html")
    context = {"latest_question_list": latest_question_list}
    print(reverse("polls:index"))
    return render(request,"polls/index.html",context)
    # return JsonResponse({"questions":json})
@csrf_exempt
def detail(request, question_id):

    if request.method == 'POST':
        # try:

            # print("body",request.body)
        jsonData = json.loads(request.body)
        print("Json data",jsonData)
        # except Exception as e :
            # print(e)
        return HttpResponse("You are viewing detail of")

    if request.method == 'GET':

        getRequest = request.GET;
        print("Get request",getRequest.get('name','Guest'))

        # question_detail = Question.objects.get(id=1)
        # print(type(question_detail))
        # return render(request, "polls/detail.html",{"question_detail" :question_detail})
        return HttpResponse("Get method")

def results(request,question_id):
    response = "You are viewing resultof question %s"
    return HttpResponse(response % question_id)

def vote (request, question_id):
    return HttpResponse("You're voting on question: %s" % question_id)


@csrf_exempt
def post_question(request):
    if request.method == "POST":
        question_text = request.POST.get('question_text',"")
        print("Question text received:",question_text)
        if(question_text):
            newQuestion = Question.objects.create(question_text=question_text)
            print("New Question",newQuestion)
            return JsonResponse(data={question_text:newQuestion.question_text})
        else:
            return HttpResponseBadRequest()
    
    if request.method == 'GET':
        # question_id = request.GET.get('id')
        # if not question_id:
        #     return HttpResponseBadRequest()
        # question_detail = Question.objects.get(pk=question_id)
        # dictionary = model_to_dict(question_detail)
        # print(dictionary)
        # return JsonResponse(data=dictionary)

        questionsModel = Question.objects.values_list('question_text')
        print(list(questionsModel))

        return HttpResponse("It works")
        # questions = [model_to_dict(q) for q in questionsModel]
        # return JsonResponse(data=questionsModel,safe=False)

