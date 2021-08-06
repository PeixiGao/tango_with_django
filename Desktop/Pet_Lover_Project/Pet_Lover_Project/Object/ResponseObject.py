from django.shortcuts import HttpResponse
import simplejson as json

class ResponseObject(object):

    def __init__(self, lang='cn'):
        self.lang = lang

    def data(self, code, res={}):
        data_cn = {
            0: '成功',
            5: '请一分钟后再尝试',
            8: '用户账号已存在',
            9: '用户账号不存在',
            10: res,
            42: '两次输入的新密码错误',
            43: '客户端服务器已关闭，请下载新版本使用',
            44: '系统错误,发送邮件失败',
            45: '系统错误，生成令牌出错!',
            46: '系统错误，发送短信失败!',
            47: '旧密码不正确',
            74: '关联旧用户失败!',
            79: '您已经申请过重置密码，请到邮箱进行确认！',
            89: '您已经获得了验证码，请在10分钟后检查或再次确认。',
            99: '账户或密码错误',
            101: '手机的用户账号已经存在！',
            102: '手机的用户账号不存在！',
            103: '邮箱用户帐户已经存在！',
            104: '邮箱用户帐户不存在！',
            107: '用户名格式不符合规则！',
            108: '邮箱格式不符合规则！',
            110: '因为用户未激活，用户是无效用户！',
            111: '您输入的密码不正确！',
            120: '验证码已过期或不存在、请重新获得验证码！',
            121: '验证码错了！',
            138: '手机格式不符合规则！',
            173: '数据不存在！',
            174: '数据已存在',
            305: '令牌格式是错误的，相关参数是不存在的！',
            307: '令牌已过期!',
            309: '你没有权限访问',
            404: 'You don not have permission to access this!',
            444: '请确认参数的正确性！',
            1112: '您输入的两次密码不一致！',
            208: '只能预定当天的或者以后的！',
        }
        data_en = {
            0: 'Success',
            5: 'Please try again one minute later！',
            8: 'User accounts already exist',
            9: 'User accounts is not exist',
            10: res,
            42: 'The new password entered twice is incorrect',
            43: 'The client server is closed. Please download the new version for use',
            44: 'System error,send email fail!',
            45: 'System error,generate token fail！',
            46: 'System error, sending SMS failed！',
            47: 'Old password is incorrect',
            74: 'Failed to connect old users！',
            79: 'You have applied for reset password, please go to email for confirmation!',
            89: 'You have already obtained the verification code, please check it or get it again after 10 minutes.',
            99: ' ERROR Incorrect account or password',
            101: 'The user account of the mobile phone has already existed!',
            102: 'The user account of the mobile phone does not exist!',
            103: 'The mailbox user account has already existed!',
            104: 'The mailbox user account does not exist!',
            107: 'The username format does not conform to the rules!',
            108: 'The mailbox format does not conform to the rules! ',
            110: 'Because the user is not activated, the user is an invalid user!',
            111: 'The password you entered is incorrect！',
            120: 'The captcha has expired or does not exist, please obtain the captcha again!',
            121: 'The verification code is wrong!',
            138: 'The phone format does not conform to the rules! ',
            173: 'Data does not exists!',
            174: 'Data already exists',
            305: 'The Token format is wrong and the related parameter is None!',
            307: 'The Token has expired!',
            309: 'You have no access',
            404: 'You don not have permission to access this!',
            444: 'Please confirm the correctness of the parameters!',
            1112: 'The two passwords you entered do not match！',
        }

        if self.lang == 'cn':
            msg = data_cn
        else:
            msg = data_en
        try:
            message = msg[code]
        except Exception as e:
            message = '系统错误，code不存在'
        return {'code': code, 'msg': message, 'res': res}

    def formal(self, code, res={}):
        formal_data = self.data(code, res)
        return json.dumps(formal_data,ensure_ascii=False)

    def json(self, code, res={}):
        result = self.formal(code, res)
        return HttpResponse(result)