#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import threading
import time

from django.utils.deprecation import MiddlewareMixin

from Model.models import UserModel, LogModel
from Object import TokenObject
from Object.TokenObject import TokenObject
from Service.CommonService import CommonService


class LogMiddleware(MiddlewareMixin):

    # def process_request(self, request):
        # if request.path == '/upload':
        #     request.encoding = 'utf-8'
        #     request_dict = request.POST
        #     print(request.POST)
        #     request.POST = request_dict

    def process_response(self, request, response):

        if request.path != '/favicon.ico':
            self.start_log_thread(request, response)
        return response

    def start_log_thread(self, request, response):
        print('start_log_thread')
        asy = threading.Thread(target=add_log, args=(request, response))
        asy.start()


def add_log(request, response):
    request.encoding = 'utf-8'
    if request.method == 'GET':
        request_dict = request.GET
    elif request.method == 'POST':
        request_dict = request.POST
    else:
        return

    # print(response.content.decode().strip())
    request_path = request.path.strip().strip('/')
    jsonObject = {}
    if request_path == 'download':
        if response.status_code != 200:
            return
    else:
        try:
            jsonObject = json.loads(response.content.decode().strip())
        except:
            jsonObject = response
            return jsonObject

        code = jsonObject.get('code')
        if code is None or code != 0 and response.status_code != 200:
            print('code is {code}'.format(code=code))
            return

    # print(request_dict)
    token = request_dict.get('token', None)
    # print(token)
    token = TokenObject(token)

    status = response.status_code
    # 去除密码
    contentDict = dict(request_dict)
    # print(contentDict)
    password = contentDict.get('password')
    if password:
        contentDict.pop('password')

    content = json.dumps(contentDict)
    ip = CommonService.get_ip_address(request)
    now_time = time.time()

    if token.code == 0:
        user_qs = UserModel.objects.filter(id=token.userID)
    else:
        # print(token.code)
        username = request_dict.get('username', None)
        if username is None:
            print('username')
            return
        user_qs = UserModel.objects.filter(username=username)

    if not user_qs.exists():
        # print('exists')
        return

    user = user_qs[0]
    operation = ''
    # print(request_path)
    if request_path == 'user/login':
        operation = 'user/login--登录账号'
    elif request_path == 'user/logout':
        operation = 'user/logout--退出登录'
    elif request_path == 'user/modify':
        operation = 'user/modify--修改密码'
    elif request_path == 'email/add':
        operation ='email/add--添加一封邮件'
    # elif request_path == 'email/select':
    #     operation = 'email/select--查询所有的邮件'
    elif request_path == 'email/delete':
        operation = 'email/delete--删除一封邮件'
    # elif request_path == 'uid/allot':
    #     area = request_dict.get('area', None)
    #     quantity = request_dict.get('quantity', None)
    #     if area and quantity:
    #         operation = formatOperation('分配', int(quantity), int(area))
    # elif request_path == 'download':
    #     area = request_dict.get('area', None)
    #     quantity = request_dict.get('quantity', None)
    #     if area and quantity:
    #         operation = formatOperation('下载', int(quantity), int(area))
    else:
        return

    log = {
        'status': status,
        'content': content,
        'ip': ip,
        'time': now_time,
        'url': request_path,
        'operation': operation,
        'user': user
    }
    print(log)
    try:
        LogModel.objects.create(**log)
    except Exception as e:
        print(repr(e))


def formatOperation(operation, quantity, area):
    str = '{operation}{quantity}个{area}UID'
    if area == 0:
        return str.format(operation=operation, quantity=quantity, area='国内')
    else:
        return str.format(operation=operation, quantity=quantity, area='国外')
