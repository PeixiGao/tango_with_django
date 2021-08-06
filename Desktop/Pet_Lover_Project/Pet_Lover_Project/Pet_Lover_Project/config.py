#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import datetime, os

SERVER_TYPE = os.environ.get('DJANGO_SETTINGS_MODULE')

OAUTH_ACCESS_TOKEN_SECRET = 'a+jbnw%@1%zy^=@dn62%'
OAUTH_REFRESH_TOKEN_SECRET = 'r+jbnw%@1%zy^=@dn62%'

# access_token超时
# OAUTH_ACCESS_TOKEN_TIME = datetime.timedelta(hours=1)
OAUTH_ACCESS_TOKEN_TIME = datetime.timedelta(days=30)
# refresh_token超时
OAUTH_REFRESH_TOKEN_TIME = datetime.timedelta(days=30)


SERVER_HOST = 'localhost'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

UNICODE_ASCII_CHARACTER_SET = ('abcdefghijklmnopqrstuvwxyz'
                               'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                               '0123456789')
