from flask import Flask, jsonify, request, redirect, session, flash
import os
from passlib.hash import bcrypt
from database import db
from models import *
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.environ['DB_USERNAME']}:{os.environ['DB_PASSWORD']}@localhost:5432/{os.environ['DB_NAME']}"
app.config['SECRET_KEY'] = os.environ['FLASK_SECRET_KEY']

# class Base(DeclarativeBase):
#     pass
# db = SQLAlchemy(model_class=Base)
db.init_app(app)

# class Base(DeclarativeBase):
#     pass

# def get_db_connection():
#     conn = psycopg2.connect(host='localhost',
#         database=os.environ['DB_NAME'],
#         user=os.environ['DB_USERNAME'],
#         password=os.environ['DB_PASSWORD'])
#     return conn

@app.route('/api/test', methods=(['POST']))
def test_form_submit():
    #if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    print(username)
    print(password)
    error = None
    user = db.session.execute(db.select(Users).filter_by(username=username)).scalar_one_or_none()
    if user is None:
        error = 'Incorrect username.'
    elif not bcrypt.verify(password, user.password_hash):
        error = 'Incorrect password.'
    if error is None:
        print('Login succeeded.')
        session.clear()
        session['user_id'] = user.id
        return redirect('/')
    print(error)
    flash(error)
    
    return redirect('/test') #TODO: add a more user-friendly way to login error
@app.route('/data')
def test_data():
    books = db.session.execute(db.select(Content)).scalars()
    return jsonify(books.all())

if __name__ == '__main__':
    app.run(debug=True)
