'''
This is encapsulated to a separate file to prevent circular import shenanigans
'''
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)