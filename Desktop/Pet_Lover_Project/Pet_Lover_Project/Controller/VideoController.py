
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from Object.ResponseObject import ResponseObject
from django.db import connection
from Object.TokenObject import TokenObject
from Model.models import ShejiXuanti,UserModel,StudentModel
import json
import time
import datetime as dt
import os
from Pet_Lover_Project.settings import BASE_DIR
from  threading import Thread
import pymysql
import xlrd
import sys
from Service.CommonService import CommonService

class VideoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(VideoView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        request.encoding = 'utf-8'
        request_dict = request.GET
        operation = kwargs.get('operation')
        return self.validation(request_dict, operation,request)

    def post(self, request, *args, **kwargs):
        request.encoding = 'utf-8'
        request_dict = request.POST
        operation = kwargs.get('operation')
        return self.validation(request_dict, operation,request)

    def validation(self, request_dict, operation,request):
        if operation == 'add':
            return self.add(request_dict,request)
        if operation == 'select':
            return self.select(request_dict,request)
        if operation == 'select1':
            return self.select1(request_dict,request)
        if operation == 'select_tu':
            return self.select_tu(request_dict, request)

        if operation == 'upload':
            # return self.upload(request_dict,request)
            return self.Imgupload(request_dict,request)

        if operation == 'delete':
            return self.delete(request_dict,request)
        if operation == 'modify':
            return self.modify(request_dict,request)
        if operation == 'download':
            return self.downloadFile(request_dict,request)
        if operation == 'download_pinyu':
            return self.download_file(request_dict,request)



        else:
            return ResponseObject().json(309)
# 添加
    def add(self, request_dict,request):
        tokens = request_dict.get('token', None)

        id = request_dict.get('id', None)
        headline = request_dict.get('headline', None)
        response = ResponseObject()
        token = TokenObject(tokens)
        if token.code != 0:
             return response.json(token.code)

        file_obj = request.FILES.get('file')
        import os
        f = open(os.path.join(BASE_DIR, 'static', 'video', file_obj.name), 'wb')
        for chunk in file_obj.chunks():
            f.write(chunk)
        f.close()
        shutup = ShejiXuanti.objects.create(headline=headline, teacher_uid=UserModel.objects.get(id=id), student_uid=StudentModel.objects.get(id=token.userID),production_url='static/video/'+file_obj.name,production_name=file_obj.name,update_time=int(time.time()), add_time=int(time.time()))
        shutup.save()
        return response.json(0, "添加成功")


    # 查询
    def select(self, request_dict,request):
        token = request_dict.get('token', None)

        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        page = request_dict.get('page', 1)
        line = request_dict.get('line', 10)
        page = int(page)
        line = int(line)
        shutup_list= ShejiXuanti.objects.filter(student_uid=token.userID).values("id","student_uid__name","student_uid__username",
                                                                                 "student_uid__nickname",
                                                                                 "production_url",
                                                                                 "remark",
                                                                                 "headline",
                                                                                 "production_name",
                                                                                 "mark",
                                                                                 "add_time",
                                                                                 "update_time",
                                                                                 )
        if shutup_list.exists():
            count = shutup_list.count()
            start = (page-1) * line
            end = start + line
            users = list(shutup_list[start:end])
            return response.json(0, {'count': count, 'data': users})
        else:
            return response.json(0,{'count': 0, 'data': []})
        # 查询

    def select1(self, request_dict, request):
        token = request_dict.get('token', None)

        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        page = request_dict.get('page', 1)
        line = request_dict.get('line', 10)
        page = int(page)
        line = int(line)
        shutup_list = ShejiXuanti.objects.filter(teacher_uid=token.userID).values("id", "student_uid__name",
                                                                                  "student_uid__username",
                                                                                  "student_uid__nickname",
                                                                                  "production_url",
                                                                                  "remark",
                                                                                  "headline",
                                                                                  "production_name",
                                                                                  "mark",
                                                                                  "add_time",
                                                                                  "update_time",
                                                                                  )
        if shutup_list.exists():
            count = shutup_list.count()
            start = (page - 1) * line
            end = start + line
            users = list(shutup_list[start:end])
            return response.json(0, {'count': count, 'data': users})
        else:
            return response.json(0, {'count': 0, 'data': []})

    def select_tu(self, request_dict, request):
        token = request_dict.get('token', None)
        list_a = []
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)

        shutup_list = ShejiXuanti.objects.filter(teacher_uid=token.userID).values(
                                                                                  "headline"
                                                                          )
        if shutup_list.exists():
            users = list(shutup_list)
            for user in shutup_list:
                list_a.append(user['headline'])
            from collections import Counter
            users =  Counter(list_a)
            return response.json(0, {'data': users})
        else:
            return response.json(0, {'count': 0, 'data': []})

    def modify(self, request_dict,request):
        response = ResponseObject()
        token = request_dict.get('token', None)
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        id = request_dict.get('id', -1)

        edit_mark = request_dict.get('edit_mark', 0)
        edit_remark = request_dict.get('edit_remark', 0)

        Dormitory_qs = ShejiXuanti.objects.filter(id=id)
        if Dormitory_qs.exists():
            user = {
                'mark': edit_mark,
                'remark': edit_remark,
            }
            Dormitory_qs.update(**user)
            return response.json(0, {'count': 1})
        else:
            return response.json(9)

# 删除
    def delete(self, request_dict,request):
        token = request_dict.get('token', None)

        id = request_dict.get('id', -1)
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        ShejiXuanti.objects.filter(id=id).delete()
        return response.json(0,{'count':1})

    def downloadFile(self, request_dict,request):
        token = request_dict.get('token', None)
        from django.shortcuts import HttpResponse
        id = request_dict.get('id', -1)
        name_url = request_dict.get('name', -1)
        # response = ResponseObject()
        token = TokenObject(token)
        # if token.code != 0:
        #     return response.json(token.code)
        file = open(id, 'rb')
        from django.http import StreamingHttpResponse

        response = StreamingHttpResponse(file)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = 'attachment;filename="'+name_url+'"'
        return response

    def download_file(self, request_dict,request):
        from django.http import HttpResponse
        id = request_dict.get('id', -1)
        name_url = request_dict.get('name', -1)
        Dormitory_qs = ShejiXuanti.objects.filter(id=id)
        remark='老师还没有打分'
        if Dormitory_qs.exists():
            remark = Dormitory_qs[0].remark
        # Text file
        response = HttpResponse()   #定义输出格式为txt
        response['Content-Disposition'] = 'attachment; filename=pingyu.txt'   #规定文件名字
        # 给txt写入内容
        response.write(remark)
        # response.write("bb")

        # PDF file
        # 在生成 PDF 文件之前，需要安装 ReportLab 库
        # http://code.djangoproject.com/svn/django/branches/0.95-bugfixes/docs/outputting_pdf.txt
        # from reportlab.pdfgen import canvas
        # from reportlab.platypus import SimpleDocTemplate, Image, Paragraph
        # from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        # from reportlab.pdfbase import pdfmetrics
        # from reportlab.pdfbase.ttfonts import TTFont
        #
        # pdfmetrics.registerFont(TTFont('SimSun', 'SimSun.ttf'))  # 注册字体
        #
        # styles = getSampleStyleSheet()
        # styles.add(ParagraphStyle(fontName='SimSun', name='Song', leading=20, fontSize=12))  # 自己增加新注册的字体
        #
        # Paragraph(remark, styles['Song']),  # 使用新字体
        # response = HttpResponse('application/pdf')
        # response['Content-Disposition'] = 'attachment; filename=laoshipinyu.pdf'
        # p = canvas.Canvas(response)
        # p.drawString(50,800,remark)
        # p.showPage()
        # p.save()

        return response

#   http://127.0.0.1:800/video/download
#   http://127.0.0.1:800/video/download_pinyu
    def Imgupload(self, request_dict, request):
        token = request_dict.get('token', None)
        operation_type = request_dict.get('operation_type', None)
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        file_obj = request.FILES.get('file')
        import os
        # f = open(os.path.join(BASE_DIR, 'static', 'video', file_obj.name), 'wb')
        fileNamePath = os.path.join(BASE_DIR, 'Controller', file_obj.name)
        print(file_obj.name)
        try:
            os.remove(fileNamePath)
            time.sleep(1)
        except Exception as e:
            print(e)

        f = open(os.path.join(BASE_DIR, 'static/images', file_obj.name), 'wb')
        for chunk in file_obj.chunks():
            f.write(chunk)
        f.close()
        return response.json(0, {'count': 0, 'data': []})

    def upload(self, request_dict, request):
        token = request_dict.get('token', None)
        operation_type = request_dict.get('operation_type', None)
        response = ResponseObject()
        token = TokenObject(token)
        if token.code != 0:
            return response.json(token.code)
        file_obj = request.FILES.get('file')
        import os
        # f = open(os.path.join(BASE_DIR, 'static', 'video', file_obj.name), 'wb')
        fileNamePath = os.path.join(BASE_DIR, 'Controller', file_obj.name)
        try:
            os.remove(fileNamePath)
            time.sleep(1)
        except Exception as e:
            print(e)

        f = open(os.path.join(BASE_DIR, 'Controller', file_obj.name), 'wb')
        for chunk in file_obj.chunks():
            f.write(chunk)
        f.close()
        try:
            login_time = time.time()
            # book = self.open_excel('student.xls')  # 打开excel文件
            book = self.open_excel(file_obj.name)  # 打开excel文件
            sheets = book.sheet_names()  # 获取所有sheet表名
            for sheet in sheets:
                sh = book.sheet_by_name(sheet)  # 打开每一张表
                row_num = sh.nrows
                list = []  # 定义列表用来存放数据
                num = 0  # 用来控制每次插入的数量
                for i in range(1, row_num):  # 第一行是标题名，对应表中的字段名所以应该从第二行开始，计算机以0开始计数，所以值是1
                    row_data = sh.row_values(i)  # 按行获取excel的值
                    num += 1
                    if (num >= 1):  # 每一万条数据执行一次插入
                        test = StudentModel.objects.filter(username=row_data[0])
                        if isinstance(row_data[1], float):
                            row_data[1] = int(row_data[1])
                        password = CommonService.get_md5(str(row_data[1]))
                        if operation_type == 'teacher':
                            if not StudentModel.objects.filter(username=row_data[0]):
                                student = StudentModel.objects.create(username=row_data[0], password=password,
                                                                      permission=1,nickname='',
                                                                      name=row_data[2], login_time=login_time,
                                                                      reg_time=login_time,online=0
                                                                      )
                                student.save()
                        elif operation_type == 'admin':

                            if not UserModel.objects.filter(username=row_data[0]):
                                teacher = UserModel.objects.create(username=row_data[0], password=password,
                                                                      permission=1,nickname='',
                                                                      name=row_data[2], login_time=login_time,
                                                                      reg_time=login_time,online=0
                                                                      )
                                teacher.save()
        except Exception as e:
            print(e)
            # return response.json(0, {'count': 0, 'data': []})
        else:
            return response.json(0, {'count': 0, 'data': []})

    def open_excel(self,excel_file):
        try:
            file_path = sys.path[0]+'/{}/{}'.format('Controller',excel_file)
            # book = xlrd.open_workbook('F:/python_sz/byglxt/XuantiServer(3)/XuantiServer/Controller/student.xls')  # 文件名，把文件与py文件放在同一目录下
            book = xlrd.open_workbook(file_path)  # 文件名，把文件与py文件放在同一目录下
            return book
        except Exception as b:
            print("open excel file failed!")

















