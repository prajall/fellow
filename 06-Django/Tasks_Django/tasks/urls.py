"""
URL configuration for tasks project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def homepage(request):
    return render(request, 'home.html')

urlpatterns = [
    path('', homepage, name='homepage'),
    path('admin/', admin.site.urls),
    path('task1_blog/', include("task1_blog.urls")),
    path('task2_ecom/', include("task2_ecom.urls")),
    path('task3_sms/', include("task3_sms.urls")),
    path('task4_library/', include("task4_library.urls")), 
    path('task5_ems/',include('task5_ems.urls'))  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


