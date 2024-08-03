from flask import Flask, jsonify, request, redirect, session, flash, g
from sqlalchemy import or_, func
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
        return redirect('/home')
    g.user = None
    session.clear()
    print(error)
    flash(error)
    
    return redirect('/login') #TODO: add a more user-friendly way to login error
    
@app.route('/api/logout')
def logout():
    session.clear()
    return redirect('/test')

@app.route('/api/content', methods=(['GET', 'POST'])) #TODO: add put later
def content():
    if 'user_id' not in session:
        return {'error': 'not signed in, please sign in by posting username and password to /api/login'}
    if request.method == 'GET':
        stmt = db.select(Content.id, Content.content_type, Content.title, Content.descr, Content.picture)
        if 'content_type' in request.args:
            stmt = stmt.filter(Content.content_type.in_(request.args.get('content_type').split(',')))
        if 'search_query' in request.args: #TODO this might have to be done with request.form instead i'm not sure how much mileage i can get out of HTML input boxes
            search = "%{}%".format(request.args['search_query'])
            content_sort_case = db.case(
                (Content.title.ilike(search), 1),
                (Content.descr.ilike(search), 2) #no else because it's an or so one of these has to match. idk if that's an issue though
            )
            stmt = stmt.filter(or_(Content.title.ilike(search), Content.descr.ilike(search))).order_by(content_sort_case)
        content = db.session.execute(stmt).all()
        return [{'id': x[0], 'content_type': x[1], 'title': x[2], 'description': x[3], 'picture': x[4]} for x in content]
    else: #currently just post, eventually add user groups so only certain people can add content and others can request for something to be added
        contentData = request.form.to_dict()
        newContent = None
        if contentData['content_type'] == 'tv_show':
            if 'finished_airing' in contentData:
                contentData['finished_airing'] = True
            else:
                contentData['finished_airing'] = False
            newContent = TvShows(**contentData)
            #print(newShow)
            #return jsonify(newShow)
        else:
            newContent = Content(**contentData) #TODO: add any other edge cases as new content types get supported
            #print(newContent)
            #return jsonify(newContent)
        db.session.add(newContent)
        db.session.commit()
        return redirect('/home')

@app.route('/api/content_parts/<content_id>', methods=(['GET'])) #TODO: add post and put later
def get_content_parts(content_id):
    if 'user_id' not in session:
       return {'error': 'not signed in, please sign in by posting username and password to /api/login'}
    stmt = db.select(ContentPart.id, ContentPart.content_type, ContentPart.title, ContentPart.descr, ContentPart.picture).filter_by(content_id=content_id)
    if 'content_type' in request.args:
        stmt = stmt.filter(ContentPart.content_type.in_(request.args.get('content_type').split(',')))
    if 'search_query' in request.args: #TODO this might have to be done with request.form instead i'm not sure how much mileage i can get out of HTML input boxes
        search = "%{}%".format(request.args['search_query'])
        contentpart_sort_case = db.case(
            (ContentPart.title.ilike(search), 1),
            (ContentPart.descr.ilike(search), 2) #no else because it's an or so one of these has to match. idk if that's an issue though
        )
        stmt = stmt.filter(or_(ContentPart.title.ilike(search), ContentPart.descr.ilike(search))).order_by(contentpart_sort_case)
    content_parts = db.session.execute(stmt).all()
    return [{'id': x[0], 'content_type': x[1], 'title': x[2], 'description': x[3], 'picture': x[4]} for x in content_parts]

@app.route('/api/logged_content', methods=(['GET', 'POST'])) #TODO: add put later
def get_logged_content():
    #if 'collection' in request.args:
    if 'user_id' not in session:
       return {'error': 'not signed in, please sign in by posting username and password to /api/login'}
    if request.method == 'GET':
        stmt = db.select(Content.title, Content.content_type, LoggedContent.status, LoggedContent.rating, LoggedContent.user_review, Content.picture).select_from(LoggedContent).filter_by(user_id=session['user_id'])
        if 'status' in request.args:
            stmt = stmt.filter(LoggedContent.status.in_(request.args.get('status').split(',')))
        stmt = stmt.join(Content, LoggedContent.content_id == Content.id)
        if 'content_type' in request.args:
            stmt = stmt.filter(Content.content_type.in_(request.args.get('content_type').split(',')))
        if 'search_query' in request.args: #TODO this might have to be done with request.form instead i'm not sure how much mileage i can get out of HTML input boxes
            search = "%{}%".format(request.args['search_query'])
            content_sort_case = db.case(
                (Content.title.ilike(search), 1),
                (Content.descr.ilike(search), 2) #no else because it's an or so one of these has to match. idk if that's an issue though
            )
            stmt = stmt.filter(or_(Content.title.ilike(search), Content.descr.ilike(search))).order_by(content_sort_case)
            # stmt = stmt.filter(or_(Content.title.ilike(search), Content.descr.ilike(search)))
        content = db.session.execute(stmt).all()
        return [{'title': x[0], 'type': x[1], 'status': x[2], 'rating': x[3], 'user_review': x[4], 'picture': x[5]} for x in content]
    else: #currently just post, TODO needs to be finished
        logData = request.form.to_dict()
        user = db.session.execute(db.select(Users).filter_by(user_id=session['user_id']))
        newLog = None
        if logData['content_type'] == 'tv_show':
            if 'finished_airing' in logData:
                logData['finished_airing'] = True
            else:
                logData['finished_airing'] = False
            newLog = TvShows(**logData)
            #print(newShow)
            #return jsonify(newShow)
        else:
            newLog = Content(**logData) #TODO: add any other edge cases as new content types get supported
            #print(newContent)
            #return jsonify(newContent)
        db.session.add(newLog)
        db.session.commit()
        return redirect('/home')
        
    
@app.route('/api/logged_content_parts/<content_id>')
def get_logged_content_parts(content_id):
    if 'user_id' not in session:
        return {'error': 'not signed in, please sign in by posting username and password to /api/login'}
    stmt = db.select(ContentPart.title, ContentPart.content_type, LoggedContent.status, LoggedContent.rating, LoggedContent.user_review, ContentPart.picture).select_from(LoggedContent).filter_by(user_id=session['user_id'])
    if 'status' in request.args:
        stmt = stmt.filter(LoggedContent.status.in_(request.args.get('status').split(',')))
    stmt = stmt.join(ContentPart, LoggedContent.content_part_id == ContentPart.id).filter_by(content_id=content_id)
    if 'content_type' in request.args:
        stmt = stmt.filter(ContentPart.content_type.in_(request.args.get('content_type').split(',')))
    if 'search_query' in request.args: #TODO this might have to be done with request.form instead i'm not sure how much mileage i can get out of HTML input boxes
        search = "%{}%".format(request.args['search_query'])
        contentpart_sort_case = db.case(
            (ContentPart.title.ilike(search), 1),
            (ContentPart.descr.ilike(search), 2) #no else because it's an or so one of these has to match. idk if that's an issue though
        )
        stmt = stmt.filter(or_(ContentPart.title.ilike(search), ContentPart.descr.ilike(search))).order_by(contentpart_sort_case)
    content_parts = db.session.execute(stmt).all()
    return [{'title': x[0], 'type': x[1], 'status': x[2], 'rating': x[3], 'user_review': x[4], 'picture': x[5]} for x in content_parts]
@app.route('/data')
def test_data():
    books = db.session.execute(db.select(ContentPart)).scalars()
    return jsonify(books.all())

if __name__ == '__main__':
    app.run(debug=True)
