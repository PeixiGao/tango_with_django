#!/usr/bin/python
import sqlite3
class sqlite_operation():
    def __init__(self):
        self.conn = sqlite3.connect('db.sqlite3')
        self.c = self.conn.cursor()

    def select(self):
        rows = self.c.execute("SELECT * FROM dogs")
        for row in rows:
           print(row)
        print("Operation done successfully")
        self.conn.close()

    def create(self):
        # 创建表
        sql = 'CREATE TABLE pcap_data(id integer PRIMARY KEY autoincrement, ' \
              'src_ip  varchar(30),dst_ip  varchar(30), num integer)'
        self.c.execute(sql)
        # 提交事物
        self.conn.commit()
        self.conn.close()


    def insert(self):
        dogList = [
            {"pet_name":"Labrador","pet_desc":"Mild temperament, smart and obedient, easy to train.","pet_images":"images/dog1.png"},
            {"pet_name":"Chinese garden","pet_desc":"The Chinese garden dog is traditionally called `soil dog","pet_images":"images/dog2.png"},
            {"pet_name":"Siberian Husky","pet_desc":"Has a beautiful coat that comes in a multitude of colors. ","pet_images":"images/dog3.png"},
            {"pet_name":"Corgi","pet_desc":"A strong, athletic, and lively little herder ","pet_images":"images/dog4.png"},

        ]
        catList = [
            {"pet_name":"American Bobtail Cat","pet_desc":"Like to stick, curious, like to chase prey.","pet_images":"images/cat1.png"},
            {"pet_name":"British Shorthair Cat","pet_desc":"Like to stick, curious, like to chase prey.","pet_images":"images/cat2.png"},
            {"pet_name":"Munchkin Cat","pet_desc":"Like to stick, curious, like to chase prey.","pet_images":"images/cat3.png"},
            {"pet_name":"Russian Blue Cat","pet_desc":"Like to stick, curious, like to chase prey.","pet_images":"images/cat4.png"},
        ]
        for index,item in  enumerate(dogList):
            data = (item.get('pet_name',''),item.get('pet_desc',''),item.get('pet_images',''))  # or ['love2', 2221]
            sql = "INSERT INTO dogs(dogsname, dogsdesc,dogsimg) VALUES(?,?,?)"
            self.c.execute(sql, data)
            # self.c.commit()
        for index,item in  enumerate(catList):
            data = (item.get('pet_name',''),item.get('pet_desc',''),item.get('pet_images',''))  # or ['love2', 2221]
            sql = "INSERT INTO cats(dogsname, dogsdesc,dogsimg) VALUES(?,?,?)"
            self.c.execute(sql, data)
        self.conn.commit()
        self.conn.close()

    def delete(self):
        sql = "delete  from dogs"
        self.c.execute(sql)
        sql = "delete  from cats"
        self.c.execute(sql)
        # self.c.commit()
        # self.c.close()


if __name__ == '__main__':
    sql_obj = sqlite_operation()
    operation = sql_obj.delete()
    operation = sql_obj.insert()
    print('Operation done successfully')