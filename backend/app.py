from flask import Flask, jsonify, request, redirect, session, flash, g
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

@app.route('/api/login', methods=(['POST']))
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
        g.user = user
        return redirect('/')
    g.user = None
    session.clear()
    print(error)
    flash(error)
    
    return redirect('/test') #TODO: add a more user-friendly way to login error
    
@app.route('/api/logout')
def logout():
    session.clear()
    return redirect('/test')

@app.route('/api/collections', methods=(['GET'])) #TODO: add post and put later
def get_collections():
    #if 'collection' in request.args:
    if 'user_id' not in session:
        return redirect('/error/') #TODO: instead direct user to login page or rather send a json response indicating you're not signed in
    stmt = db.select(ContentCollection.title, ContentCollection.content_type, LoggedContent.status, LoggedContent.rating, LoggedContent.user_review).select_from(LoggedContent).filter_by(user_id=session['user_id'])
    if 'status' in request.args:
        stmt = stmt.filter(LoggedContent.status.in_(request.args.get('status').split(',')))
    stmt = stmt.join(ContentCollection, LoggedContent.content_collection_id == ContentCollection.id)
    if 'content_type' in request.args:
        stmt = stmt.filter(ContentCollection.content_type.in_(request.args.get('content_type').split(',')))
    collections = db.session.execute(stmt).all()
    return [{'title': x[0], 'type': x[1], 'status': x[2], 'rating': x[3], 'user_review': x[4]} for x in collections]
    
@app.route('/api/content/<collection_id>')
def get_collection_contents(collection_id):
    stmt = db.select(Content.title, Content.content_type, LoggedContent.status, LoggedContent.rating, LoggedContent.user_review).select_from(LoggedContent).filter_by(user_id=session['user_id'])
    if 'status' in request.args:
        stmt = stmt.filter(LoggedContent.status.in_(request.args.get('status').split(',')))
    stmt = stmt.join(Content, LoggedContent.content_id == Content.id).filter_by(collection_id=collection_id)
    if 'content_type' in request.args:
        stmt = stmt.filter(Content.content_type.in_(request.args.get('content_type').split(',')))
    content = db.session.execute(stmt).all()
    return [{'title': x[0], 'type': x[1], 'status': x[2], 'rating': x[3], 'user_review': x[4]} for x in content]
@app.route('/data')
def test_data():
    books = db.session.execute(db.select(Content)).scalars()
    return jsonify(books.all())

if __name__ == '__main__':
    app.run(debug=True)
