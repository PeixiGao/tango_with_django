# !/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from Object.ResponseObject import ResponseObject
from django.db import connection
from Object.TokenObject import TokenObject
from Model.models import Title
import json
import time
import datetime as dt


class TitleView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(TitleView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        request.encoding = 'utf-8'
        request_dict = request.GET
        operation = kwargs.get('operation')
        return self.validation(request_dict, operation)

    def post(self, request, *args, **kwargs):
        request.encoding = 'utf-8'
        request_dict = request.POST
        operation = kwargs.get('operation')
        return self.validation(request_dict, operation)

    def validation(self, request_dict, operation):
        if operation == 'add':
            return self.add(request_dict)
        if operation == 'select':
            return self.select(request_dict)
        if operation == 'delete':
            return self.delete(request_dict)
        if operation == 'modify':
            return self.modify(request_dict)

        else:
            return ResponseObject().json(309)

    # add
    def add(self, request_dict):
        tokens = request_dict.get('token', None)
        response = ResponseObject()

        token = TokenObject(tokens)
        if token.code != 0:
            return response.json(token.code)
        paper_headline = request_dict.get('title', "")
        shutup = Title.objects.create(paper_headline=paper_headline, add_time=int(time.time()),
                                           update_time=int(time.time()))
        shutup.save()
        return response.json(0, "添加成功")

    # select
    def select(self, request_dict):
        token = request_dict.get('token', None)

        response = ResponseObject()
        # token = TokenObject(token)
        # if token.code != 0:
        #     return response.json(token.code)
        page = request_dict.get('page', 0)
        line = request_dict.get('line', 0)

        page = int(page)
        line = int(line)
        shutup_list = Title.objects.filter().values()
        if shutup_list.exists():
            count = shutup_list.count()
            start = (page - 1) * line
            end = start + line
            if line == 0 and page == 0:
                shutup_list = Title.objects.filter().values()

                users = list(shutup_list)
                print(users)
                return response.json(0, {'count': count, 'data': users})
            else:
                users = list(shutup_list[start:end])
            return response.json(0, {'count': count, 'data': users})
        else:
            return response.json(0, {'count': 0, 'data': []})

    # delete
    def delete(self, request_dict):
        token = request_dict.get('token', None)
        id = request_dict.get('id', -1)
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        Title.objects.filter(id=id).delete()
        return response.json(0, {'count': 1})

    def modify(self, request_dict):
        response = ResponseObject()
        token = request_dict.get('token', None)
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        id = request_dict.get('id', -1)
        building_number = request_dict.get('building_number', "")
        dormitory_number = request_dict.get('dormitory_number', "")
        level = request_dict.get('level', "")
        Dormitory_qs = Title.objects.filter(id=id)
        if Dormitory_qs.exists():
            user = {
                'building_number': building_number,
                'dormitory_number': dormitory_number,
                'level': level,
            }
            Dormitory_qs.update(**user)
            return response.json(0, {'count': 1})
        else:
            return response.json(9)

















