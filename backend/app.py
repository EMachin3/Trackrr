from flask import Flask, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from sqlalchemy.orm import DeclarativeBase
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.environ['DB_USERNAME']}:{os.environ['DB_PASSWORD']}@localhost:5432/{os.environ['DB_NAME']}"

class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)
db.init_app(app)

class Base(DeclarativeBase):
    pass

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])
    return conn
 
@app.route('/data')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    #cur.execute('SELECT * FROM books;')
    cur.execute('select row_to_json(t) books from (select title, author from books) t;')
    books = cur.fetchall()
    books = [book[0] for book in books] #TODO: replace with scalar thing
    print(type(books))
    print(books)
    cur.close()
    conn.close()
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True)
