#!/usr/bin/env python3  
# -*- coding: utf-8 -*-  

import redis

from Pet_Lover_Project.config import SERVER_HOST
from Pet_Lover_Project.config import SERVER_TYPE

'''
db=3  -> 统计在线人数用
'''


class RedisObject:

    def __init__(self, db=0,SERVER_HOST = SERVER_HOST):
        if db == 3:
            if SERVER_TYPE != 'Ansjer.formal_settings':
                db = 4
        self.POOL = redis.ConnectionPool(host=SERVER_HOST, port=6379, db=db)
        self.CONN = redis.Redis(connection_pool=self.POOL)

    def set_data(self, key, val, expire=0):
        try:
            self.CONN.set(key, val)
            if expire > 0:
                self.CONN.expire(key, expire)
        except Exception as e:
            return False
        else:
            return True

    def get_data(self, key):
        try:
            val = self.CONN.get(key)
        except Exception as e:
            print(repr(e))
            return False
        else:
            if val:
                return val.decode('utf-8')
            else:
                return False

    def del_data(self, key):
        try:
            val = self.CONN.delete(key)
        except Exception as e:
            print(repr(e))
            return False
        else:
            return True

    def get_size(self):
        return self.CONN.dbsize()

    # 向列表插入数据
    def rpush(self, name, val):
        self.CONN.rpush(name, val)

    # 获取列表长度
    def llen(self, name):
        return self.CONN.llen(name=name)

    # 获取列表所有数据
    def lrange(self, name, start, end):
        return self.CONN.lrange(name, start, end)

    def get_ttl(self, key):
        ttl = self.CONN.ttl(key)
        if ttl:
            return ttl
        else:
            return 0
