#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# author_='pengzhibo';
# date: 2020/11/10 10:31
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from Model.models import *
from Object.ResponseObject import ResponseObject
from Object.TokenObject import TokenObject
from Service.CommonService import CommonService
import time
from django.shortcuts import render
def html(request):
    return render(request, "home.html")
