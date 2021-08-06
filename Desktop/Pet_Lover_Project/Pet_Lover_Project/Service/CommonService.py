# -*- coding: utf-8 -*-
import datetime
import time
from pathlib import Path
from random import Random
import ipdb
import simplejson as json
from django.core import serializers
from django.utils import timezone
from pyipip import IPIPDatabase
from Pet_Lover_Project.config import BASE_DIR, UNICODE_ASCII_CHARACTER_SET
import hashlib,data

# 复用性且公用较高封装代码在这
class CommonService:
    # 添加模糊搜索
    @staticmethod
    def get_kwargs(data={}):
        kwargs = {}
        for (k, v) in data.items():
            if v is not None and v != u'':
                kwargs[k + '__icontains'] = v
        return kwargs

    # 定义静态方法
    # 格式化query_set转dict
    @staticmethod
    def qs_to_dict(query_set):
        sqlJSON = serializers.serialize('json', query_set)
        sqlList = json.loads(sqlJSON)
        sqlDict = dict(zip(["datas"], [sqlList]))
        return sqlDict

    # 获取文件大小
    @staticmethod
    def get_file_size(file_path='', suffix_type='', decimal_point=0):

        # for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        # path = Path() / 'D:/TestServer/123444.mp4'
        path = Path() / file_path
        size = path.stat().st_size
        mb_size = 0.0
        if suffix_type == 'MB':
            mb_size = size / 1024.0 / 1024.0
        if decimal_point != 0:
            mb_size = round(mb_size, decimal_point)
        return mb_size

    @staticmethod
    def get_param_flag(data=[]):
        # print(data)
        flag = True
        for v in data:
            if v is None:
                flag = False
                break
        return flag

    @staticmethod
    def get_ip_address(request):
        """
        获取ip地址
        :param request:
        :return:
        """
        try:
            real_ip = request.META['HTTP_X_FORWARDED_FOR']
            clientIP = real_ip.split(",")[0]
        except:
            try:
                clientIP = request.META['REMOTE_ADDR']
            except Exception as e:
                clientIP = ''
        return clientIP

    # @获取一天每个小时的datetime.datetime
    @staticmethod
    def getTimeDict(times):
        time_dict = {}
        t = 0
        for x in range(24):
            if x < 10:
                x = '0' + str(x)
            else:
                x = str(x)
            a = times.strftime("%Y-%m-%d") + " " + x + ":00:00"
            time_dict[t] = timezone.datetime.strptime(a, '%Y-%m-%d %H:%M:%S')
            t += 1
        return time_dict

    # 根据ip获取地址
    @staticmethod
    def getAddr(ip):
        base_dir = BASE_DIR
        # ip数据库
        db = IPIPDatabase(base_dir + '/DB/17monipdb.dat')
        addr = db.lookup(ip)
        ts = addr.split('\t')[0]
        return ts

    # 通过ip检索ipip指定信息 lang为CN或EN
    @staticmethod
    def getIpIpInfo(ip, lang, update=False):
        ipbd_dir = BASE_DIR + "/DB/mydata4vipday2.ipdb"
        db = ipdb.City(ipbd_dir)
        if update:
            rr = db.reload(ipbd_dir)
        info = db.find_map(ip, lang)
        return info

    @staticmethod
    def getUserID(userPhone='13800138000', getUser=True, setOTAID=False, μs=True):
        if μs == True:
            if getUser == True:
                timeID = str(round(time.time() * 1000000))
                userID = timeID + userPhone

                return userID
            else:
                if setOTAID == False:
                    timeID = str(round(time.time() * 1000000))
                    ID = userPhone + timeID

                    return ID
                else:
                    timeID = str(round(time.time() * 1000000))
                    eID = '13800' + timeID + '138000'
                    return eID
        else:
            if getUser == True:
                timeID = str(round(time.time() * 1000))
                userID = timeID + userPhone

                return userID
            else:
                if setOTAID == False:
                    timeID = str(round(time.time() * 1000))
                    ID = userPhone + timeID

                    return ID
                else:
                    timeID = str(round(time.time() * 1000))
                    eID = '13800' + timeID + '138000'
                    return eID

    # 生成随机数
    @staticmethod
    def RandomStr(randomlength=8, number=True):
        str = ''
        if number == False:
            characterSet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsT' \
                           'tUuVvWwXxYyZz0123456789'
        else:
            characterSet = '0123456789'

        length = len(characterSet) - 1

        random = Random()
        for index in range(randomlength):
            str += characterSet[random.randint(0, length)]
        return str

    # 生成订单好
    @staticmethod
    def createOrderID():
        random_id = CommonService.RandomStr(6, True)
        order_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S') + str(random_id)
        return order_id

    # qs转换list datetime处理
    @staticmethod
    def qs_to_list(qs):
        res = []
        # print(qs)
        for ps in qs:
            try:
                if 'add_time' in ps:
                    ps['add_time'] = ps['add_time'].strftime("%Y-%m-%d %H:%M:%S")
                if 'update_time' in ps:
                    ps['update_time'] = ps['update_time'].strftime("%Y-%m-%d %H:%M:%S")
                if 'end_time' in ps:
                    ps['end_time'] = ps['end_time'].strftime("%Y-%m-%d %H:%M:%S")
                if 'data_joined' in ps:
                    if ps['data_joined']:
                        ps['data_joined'] = ps['data_joined'].strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        ps['data_joined'] = ''
                if 'userID__data_joined' in ps:
                    if ps['userID__data_joined']:
                        ps['userID__data_joined'] = ps['userID__data_joined'].strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        ps['userID__data_joined'] = ''
            except Exception as e:
                pass
            res.append(ps)
        return res

    # 获取当前时间
    @staticmethod
    def get_now_time_str(n_time, tz):
        n_time = int(n_time)
        if tz:
            n_time = n_time + 3600 * float(tz)
        n_date = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(int(n_time)))
        return n_date

    # 生成随机数
    @staticmethod
    def encrypt_data(randomlength=8, number=False):
        str = ''
        if number == False:
            characterSet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsT' \
                           'tUuVvWwXxYyZz0123456789'
        else:
            characterSet = '0123456789'

        length = len(characterSet) - 1

        random = Random()
        for index in range(randomlength):
            str += characterSet[random.randint(0, length)]
        return str

    # 变成md5
    @staticmethod
    def get_md5(data):
        # 加盐
        obj = hashlib.md5('iuqe832643873gh'.encode('utf-8'))
        obj.update(data.encode('utf-8'))
        result = obj.hexdigest()
        return result