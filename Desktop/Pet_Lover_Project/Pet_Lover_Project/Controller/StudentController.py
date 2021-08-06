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
class StudentView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(StudentView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        # print('get')
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
        if operation == 'login':
            return self.login(request_dict)
        elif operation == 'register':
            return self.register(request_dict)
        elif operation == 'logout':
            return self.logout(request_dict)
        elif operation == 'query':
            return self.do_query(request_dict)
        elif operation == 'comment_query':
            return self.comment_query(request_dict)
        elif operation == 'search':
            return self.search(request_dict)
        elif operation == 'modify':
            return self.do_modify_password(request_dict)
        elif operation == 'delete':
            return self.delete(request_dict)
        elif operation == 'update':
            return self.update(request_dict)
        elif operation == 'comment_update':
            return self.comment_update(request_dict)
        else:
            return ResponseObject().json(309)





    def login(self, request_dict):
        # string_num = "5fc8b49b00070000"
        # print(str(int(string_num.upper(), 16)))

        username = request_dict.get('username', None)
        password = request_dict.get('password', None)
        response = ResponseObject()

        if username is None or password is None:
            return response.json(444)

        user = StudentModel.objects.filter(username=username)
        if user.exists():
            if user[0].password == CommonService.get_md5(password) :
                token = TokenObject()
                res = token.generate({'userID': user[0].id})
                res['permission'] = user[0].permission
                res['username'] = user[0].username

                user[0].online = 1
                update = {
                    'online': 1,
                    'login_time' :time.time()
                }
                user.update(**update)
                return response.json(0, res)
            else:
                return response.json(99)
        else:
            return response.json(99)

    def do_query(self, request_dict):
        response = ResponseObject()
        type = request_dict.get('type', None)
        if type == 'cat':
            page = request_dict.get('page', None)
            line = request_dict.get('line', None)
            line = int(line)
            user_qs = CatsModel.objects.filter().values()
            # user_qs = StudentModel.objects.filter().values()
            if user_qs.exists():
                count = user_qs.count()
                start = (int(page) - 1 * 1) * line
                end = start + line
                users = list(user_qs[start:end])
                return response.json(0, {'count': count, 'data': users})
            else:
                return response.json(0, {'count': 0, 'data': []})
        else:
            page = request_dict.get('page', None)
            line = request_dict.get('line', None)
            line = int(line)
            user_qs = DogsModel.objects.filter().values()
            # user_qs = StudentModel.objects.filter().values()
            if user_qs.exists():
                count = user_qs.count()
                start = (int(page) - 1*1) * line
                end = start + line
                users = list(user_qs[start:end])
                return response.json(0, {'count': count, 'data': users})
            else:
                return response.json(0, {'count': 0, 'data': []})

    def do_modify_password(self, request_dict):
        token = request_dict.get('token', None)
        old_password = request_dict.get('oldPassword', None)
        new_password = request_dict.get('newPassword', None)
        token = TokenObject(token)

        response = ResponseObject()
        if token.code != 0:
            return response.json(token.code)

        if old_password and new_password:
            user_qs = StudentModel.objects.filter(id=token.userID)
            if user_qs.exists():
                if user_qs[0].password != old_password:
                    return response.json(47)
                user = {
                    'password': new_password
                }
                user_qs.update(**user)
                return response.json(0)
            else:
                return response.json(9)
        else:
            return response.json(444)

    def logout(self, request_dict):
        token = request_dict.get('token', None)
        token = TokenObject(token)
        response = ResponseObject()
        if token.code != 0:
            return response.json(token.code)

        user_qs = StudentModel.objects.filter(id=token.userID)
        if user_qs.exists():
            user = {
                'online': 0
            }
            user_qs.update(**user)
            return response.json(0)
        else:
            return response.json(9)
    def update(self,request_dict):
        id = request_dict.get('id', -1)
        pet_type = request_dict.get('type', '')
        if pet_type == 'cat':
            print(id)
            dogsname = request_dict.get('dogsname', '')
            dogs_desc = request_dict.get('dogsdesc', '')
            dogsimg = request_dict.get('dogsimg', '')
            response = ResponseObject()
            user_qs = CatsModel.objects.filter(id=id)
            if user_qs.exists():
                CatsModel.objects.filter(id=id).update(
                    dogsname=dogsname,
                    dogsdesc=dogs_desc,
                    dogsimg=dogsimg,
                )
                return response.json(0)
            else:
                return response.json(9)
        else:

            print(id)
            dogsname = request_dict.get('dogsname', '')
            dogs_desc = request_dict.get('dogsdesc', '')
            dogsimg = request_dict.get('dogsimg', '')
            response = ResponseObject()
            user_qs = DogsModel.objects.filter(id=id)
            if user_qs.exists():
                DogsModel.objects.filter(id=id).update(
                    dogsname=dogsname,
                    dogsdesc=dogs_desc,
                    dogsimg=dogsimg,
                )
                return response.json(0)
            else:
                return response.json(9)

    def register(self, request_dict):
        response = ResponseObject()
        type = request_dict.get('type', '')
        dogsimg = request_dict.get('dogsimg', None)

        if dogsimg:
            dogsimg = dogsimg.split('\\')[-1]
            dogsimg = 'images/'+ dogsimg
        dogstype = request_dict.get('dogstype', None)
        dogsname = request_dict.get('dogsname', None)
        dogsdesc = request_dict.get('dogsdesc', None)
        type = request_dict.get('type', None)
        # user_qs = StudentModel.objects.filter(username=username)
        user_qs = DogsModel.objects.filter(dogsname=dogsname)
        if user_qs.exists():
            return response.json(10, "这个名字已经存在！")
        elif  type == 'dog':
            user = DogsModel.objects.create(dogstype=dogstype,
                                            dogsname=dogsname,
                                            dogsdesc=dogsdesc,
                                            dogsimg=dogsimg,
                                            login_time=time.time(),
                                            reg_time=time.time(),
                                            permission=1,
                                            )
            user.save()
            return response.json(0, "添加成功")

    # 删除
    def delete(self, request_dict):
        token = request_dict.get('token', None)
        id = request_dict.get('id', -1)
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        DogsModel.objects.filter(id=id).delete()
        return response.json(0, {'count': 1})

    #http://192.168.1.11:800/user/register?username=pzb&password=123456

    def search(self, request_dict):
        response = ResponseObject()
        type = request_dict.get('type', None)
        search = request_dict.get('search', '')
        if type == 'cat':
            page = request_dict.get('page', None)
            line = request_dict.get('line', None)
            line = int(line)
            if search:
                user_qs = CatsModel.objects.filter(dogsname__contains=search).values()
            else:
                user_qs = CatsModel.objects.filter().values()
            if user_qs.exists():
                count = user_qs.count()
                start = (int(page) - 1 * 1) * line
                end = start + line
                users = list(user_qs[start:end])
                return response.json(0, {'count': count, 'data': users})
            else:
                return response.json(0, {'count': 0, 'data': []})
        else:
            search = request_dict.get('search', '')
            page = request_dict.get('page', None)
            line = request_dict.get('line', None)
            line = int(line)
            if search:
                user_qs = DogsModel.objects.filter(dogsname__contains=search).values()
            else:
                user_qs = DogsModel.objects.filter().values()
            if user_qs.exists():
                count = user_qs.count()
                start = (int(page) - 1*1) * line
                end = start + line
                users = list(user_qs[start:end])
                return response.json(0, {'count': count, 'data': users})
            else:
                return response.json(0, {'count': 0, 'data': []})

    def comment_query(self, request_dict):
        response = ResponseObject()
        # type = request_dict.get('type', None)
        page = request_dict.get('page', None)
        line = request_dict.get('line', None)
        line = int(line)
        user_qs = CommentModel.objects.filter().values()
        # user_qs = StudentModel.objects.filter().values()
        if user_qs.exists():
            count = user_qs.count()
            start = (int(page) - 1*1) * line
            end = start + line
            users = list(user_qs[start:end])
            return response.json(0, {'count': count, 'data': users})
        else:
            return response.json(0, {'count': 0, 'data': []})

    def comment_update(self,request_dict):
        id = request_dict.get('id', -1)
        user_name = request_dict.get('user_name', '')
        user_comment = request_dict.get('user_comment', '')
        response = ResponseObject()
        CommentModel.objects.create(
            user_name=user_name,
            user_comment=user_comment,
        )
        return response.json(0)



