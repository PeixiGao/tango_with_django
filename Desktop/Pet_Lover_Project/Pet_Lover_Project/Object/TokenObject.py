#!/usr/bin/env python3  
# -*- coding: utf-8 -*-  

from Pet_Lover_Project.config import OAUTH_ACCESS_TOKEN_SECRET, OAUTH_REFRESH_TOKEN_SECRET, OAUTH_ACCESS_TOKEN_TIME, \
    OAUTH_REFRESH_TOKEN_TIME
import jwt, time

class TokenObject:

    def __init__(self, token=None):
        self.token = token
        self.lang = None
        self.userID = None
        self.user = ''
        self.code = 0
        # 令牌校验
        self.valid()

    def valid(self):
        if self.token is None:
            self.code = 309
            return
        try:
            res = jwt.decode(self.token, OAUTH_ACCESS_TOKEN_SECRET, algorithms='HS256')
            # print(res)
            self.userID = res.get('userID', None)
            self.lang = res.get('lang', None)
            self.user = res.get('user', '')
            # 刷新登录时间
            # if self.userID:
            #     print(self.user)
            #     redisObj = RedisObject(db=3)
            #     redisObj.set_data(key=self.userID, val=self.user, expire=300)

        except jwt.ExpiredSignatureError as e:
            print('过期')
            print(repr(e))
            self.code = 309
            return
        except Exception as e:
            self.code = 309
            return
        else:
            if not self.userID:
                self.code = 309
                return
            else:
                if self.userID:
                    self.code = 0
                    return res
                else:
                    self.code = 309
                    return
    # token加密
    def generate(self, data={}):
        try:
            access_expire = int(OAUTH_ACCESS_TOKEN_TIME.total_seconds())
            refresh_expire = int(OAUTH_REFRESH_TOKEN_TIME.total_seconds())
            now_stamp = int(time.time())
            access_data = data
            refresh_data = data
            access_data['exp'] = access_expire + now_stamp
            refresh_data['exp'] = refresh_expire + now_stamp
            access_token = jwt.encode(access_data,
                                      OAUTH_ACCESS_TOKEN_SECRET,
                                      algorithm='HS256')
            refresh_token = jwt.encode(
                refresh_data,
                OAUTH_REFRESH_TOKEN_SECRET,
                algorithm='HS256')
            res = {
                'access_token': access_token.decode('utf-8'),
                'access_expire': access_expire,
                'refresh_expire': refresh_expire,
                'refresh_token': refresh_token.decode('utf-8'),
            }
        except Exception as e:
            self.code = 309
            print(repr(e))
        else:
            self.code = 0
            return res

    def refresh(self):
        if not self.token:
            self.code = 309
            return
        try:
            res = jwt.decode(self.token, OAUTH_REFRESH_TOKEN_SECRET, algorithms='HS256')
        except jwt.ExpiredSignatureError as e:
            print('过期')
            print(repr(e))
            self.code = 309
        except Exception as e:
            self.code = 309
            print(repr(e))
        else:
            self.code = 0
            userID = res.get('userID', '')
            user = res.get('user', '')
            lang = self.lang
            refreshRes = self.generate(data={'userID': userID, 'lang':lang , 'user': user})
            return refreshRes
if __name__ == '__main__':
    # import jwt
    # token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxIiwiZXhwIjoxNjA3NjAzOTkxfQ.1y9fHdx-4AcfTB8WdMi4AcmPXWmSRrhIfnQLFkqg1go'
    # res = jwt.decode(token, 'a+ssss%@1%zy^=@dn62%', algorithms='HS256')
    # print(res)
    tokenObj = TokenObject()
    data = {}
    res =  tokenObj.generate(data)
    print(res)