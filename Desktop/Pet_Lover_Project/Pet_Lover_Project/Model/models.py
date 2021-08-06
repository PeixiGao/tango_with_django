from django.db import models

# Create your models here.


class UserModel(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=128, null=False, verbose_name='用户名')
    password = models.CharField(max_length=128, null=False, verbose_name='密码')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    nickname = models.CharField(max_length=24, default='', verbose_name='昵称')
    name = models.CharField(max_length=24, default='', verbose_name='用户名')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '管理员老师表'
        verbose_name_plural = verbose_name
        db_table = 'a_teacher'


class StudentModel(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=128, null=False, verbose_name='学号')
    password = models.CharField(max_length=128, null=False, verbose_name='密码')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    nickname = models.CharField(max_length=24, default='', verbose_name='昵称')
    name = models.CharField(max_length=24, default='', verbose_name='用户名')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '学生表'
        verbose_name_plural = verbose_name
        db_table = 'a_student'

class LogModel(models.Model):
    id = models.AutoField(primary_key=True)
    operation = models.CharField(max_length=100, default='', verbose_name='操作描述')
    time = models.IntegerField(default=0, verbose_name='操作时间')
    ip = models.CharField(default='', max_length=24, verbose_name='用户ip')
    user = models.ForeignKey(UserModel, to_field='id', on_delete=models.CASCADE, verbose_name='关联用户id')
    content = models.TextField(default='', verbose_name='请求参数')
    status = models.IntegerField(default=0, verbose_name='请求状态')
    url = models.CharField(max_length=150, default='', verbose_name='请求路径')

    class Meta:
        ordering = ('-time',)
        verbose_name = '日志表'
        verbose_name_plural = verbose_name
        db_table = 'a_log'

# Create your models here.
class ShejiXuanti(models.Model):
    id = models.AutoField(primary_key=True)
    production_url = models.CharField(max_length=132, default='', null=False)
    production_name = models.CharField(max_length=32, default='', null=False)
    teacher_uid = models.ForeignKey("UserModel", to_field='id', on_delete=models.CASCADE)
    student_uid = models.ForeignKey("StudentModel", to_field='id', on_delete=models.CASCADE)
    add_time = models.IntegerField(blank=True, default=0, verbose_name='添加时间')
    update_time = models.IntegerField(blank=True, default=0, verbose_name='修改时间')
    mark = models.CharField(max_length=32, default='', verbose_name='打分')
    headline = models.CharField(max_length=32, default='', verbose_name='选题标题')
    remark = models.CharField(max_length=3132, default='', verbose_name='老师的评语')

    class Meta:
        verbose_name = '选题信息表'
        verbose_name_plural = verbose_name
        db_table = 'xuanti'

# 新增论文题目

class Title(models.Model):
    id = models.AutoField(primary_key=True)
    add_time = models.IntegerField(blank=True, default=0, verbose_name='添加时间')
    update_time = models.IntegerField(blank=True, default=0, verbose_name='修改时间')
    paper_headline = models.CharField(max_length=32, default='', verbose_name='选题标题')

    class Meta:
        verbose_name = '论文题目表'
        verbose_name_plural = verbose_name
        db_table = 'title'

class DogsModel(models.Model):
    id = models.AutoField(primary_key=True)
    dogstype = models.CharField(unique=True, max_length=128, null=False, verbose_name='宠物类型')
    dogsname = models.CharField(max_length=128, null=False, verbose_name='宠物名称')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    dogsdesc = models.CharField(max_length=24, default='', verbose_name='宠物描述')
    dogsimg = models.CharField(max_length=24, default='', verbose_name='宠物图片')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '狗狗表'
        verbose_name_plural = verbose_name
        db_table = 'dogs'

class CatsModel(models.Model):
    id = models.AutoField(primary_key=True)
    dogstype = models.CharField(unique=True, max_length=128, null=False, verbose_name='宠物类型')
    dogsname = models.CharField(max_length=128, null=False, verbose_name='宠物名称')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    dogsdesc = models.CharField(max_length=24, default='', verbose_name='宠物描述')
    dogsimg = models.CharField(max_length=24, default='', verbose_name='宠物图片')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '猫咪表'
        verbose_name_plural = verbose_name
        db_table = 'cats'

class RabbitsModel(models.Model):
    id = models.AutoField(primary_key=True)
    dogstype = models.CharField(unique=True, max_length=128, null=False, verbose_name='宠物类型')
    dogsname = models.CharField(max_length=128, null=False, verbose_name='宠物名称')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    dogsdesc = models.CharField(max_length=24, default='', verbose_name='宠物描述')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '兔子表'
        verbose_name_plural = verbose_name
        db_table = 'rabbits'

class BirdsModel(models.Model):
    id = models.AutoField(primary_key=True)
    dogstype = models.CharField(unique=True, max_length=128, null=False, verbose_name='宠物类型')
    dogsname = models.CharField(max_length=128, null=False, verbose_name='宠物名称')
    permission = models.CharField(max_length=24, null=False, verbose_name='权限')
    dogsdesc = models.CharField(max_length=24, default='', verbose_name='宠物描述')
    login_time = models.IntegerField(blank=True, default=0, verbose_name='登录时间')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '小鸟表'
        verbose_name_plural = verbose_name
        db_table = 'birds'

class CommentModel(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(unique=True, max_length=128, null=False, verbose_name='')
    user_comment = models.CharField(unique=True, max_length=128, null=False, verbose_name='')
    reg_time = models.IntegerField(blank=True, default=0, verbose_name='注册时间')
    online = models.SmallIntegerField(default=0, verbose_name='是否在线')

    class Meta:
        verbose_name = '留言表'
        verbose_name_plural = verbose_name
        db_table = 'comment'


# python manage.py makemigrations Model
# python manage.py migrate Model
# python manage.py makemigrations
# python manage.py migrate