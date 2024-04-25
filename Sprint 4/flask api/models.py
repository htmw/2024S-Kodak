from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.mysql import LONGTEXT
# from sqlalchemy.orm import declarative_base


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    username = db.Column(db.String(255),primary_key=True)
    password = db.Column(db.String(255))
    keywords = db.Column(db.String(255))
    resume = db.Column(LONGTEXT)
    contact_number = db.Column(db.String(255))
    email = db.Column(db.String(255))



    