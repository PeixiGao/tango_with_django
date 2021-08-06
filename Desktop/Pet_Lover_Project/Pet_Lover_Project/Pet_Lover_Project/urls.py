"""GraduationManagementSystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import path, re_path

from Controller import UserController,VideoController,StudentController,TitleController,jump

urlpatterns = [
    path('', jump.html),
    re_path('user/(?P<operation>.*)', UserController.UserView.as_view()),
    re_path('video/(?P<operation>.*)', VideoController.VideoView.as_view()),
    re_path('student/(?P<operation>.*)', StudentController.StudentView.as_view()),
    re_path('title/(?P<operation>.*)', TitleController.TitleView.as_view()),
]
