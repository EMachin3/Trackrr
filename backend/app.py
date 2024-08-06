from flask import Flask, jsonify, request, redirect, session, flash, g
from sqlalchemy import or_, func
import os, json
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
        stmt = db.select(Content.id, Content.content_type, Content.title, Content.descr, Content.picture, Content.num_seasons, Content.num_episodes)
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
        return [{'id': x[0], 'content_type': x[1], 'title': x[2], 'description': x[3], 'picture': x[4], 'num_seasons': x[5], 'num_episodes': x[6]} for x in content]
    else: #currently just post, eventually add user groups so only certain people can add content and others can request for something to be added
        contentData = request.form.to_dict()
        #TODO this line is for testing, remove it
        #print(contentData['content_parts'])
        newContent = None
        if contentData['content_type'] == 'tv_show':
            # if 'finished_airing' in contentData:
            #     contentData['finished_airing'] = True
            # else:
            #     contentData['finished_airing'] = False
            contentData['finished_airing'] = 'finished_airing' in contentData
            seasons = json.loads(contentData['content_parts'])
            del contentData['content_parts']
            newContent = TvShows(**contentData)
            for (season_index, season) in enumerate(seasons):
                for (episode_index, episode) in enumerate(season):
                    TvEpisodes(**episode, season_num=season_index+1, episode_num=episode_index+1, show=newContent)
            #print(newShow)
            #return jsonify(newShow)
            # db.session.add(newContent)
            # db.session.commit()
        else:
            newContent = Content(**contentData) #TODO: add any other edge cases as new content types get supported
            #print(newContent)
            #return jsonify(newContent)
            # db.session.add(newContent)
            # db.session.commit()
        db.session.add(newContent)
        db.session.commit()
        return redirect('/home')

@app.route('/api/content/<content_id>/count_season_parts/<season_num>')
def season_num_parts(content_id, season_num):
    if 'user_id' not in session:
        return {'error': 'not signed in, please sign in by posting username and password to /api/login'}
    def get_count(q):
        count_q = q.with_only_columns(func.count()).order_by(None)
        count = db.session.execute(count_q).scalar()
        return count
    q = db.select(ContentPart).filter_by(content_id=content_id, season_num=season_num)
    # print(f"Count: {get_count(q)}")
    return str(get_count(q))

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
        #TODO possibly handle case where you log something that's already been logged
        logData = request.form.to_dict()
        # user = db.session.execute(db.select(Users).filter_by(user_id=session['user_id']))
        # newLog = None
        # if logData['content_type'] == 'tv_show':
        #     if 'finished_airing' in logData:
        #         logData['finished_airing'] = True
        #     else:
        #         logData['finished_airing'] = False
        #     newLog = TvShows(**logData)
        #     #print(newShow)
        #     #return jsonify(newShow)
        # else:
        #     newLog = Content(**logData) #TODO: add any other edge cases as new content types get supported
        #     #print(newContent)
        #     #return jsonify(newContent)
        contentType = logData['content_type']
        numSeasons = int(logData['content_num_seasons'])
        contentID = int(logData['content_id'])
        status = logData['status']
        # currSeasonNum = int(logData['curr_season'])
        # currEpisodeNum = int(logData['curr_episode'])
        rating = logData['rating']
        userReview = logData['user_review']
        #TODO: maybe just get rid of splat operator in this function at this point
        del logData['content_type']
        del logData['content_num_seasons']
        del logData['content_id']
        del logData['status']
        # del logData['curr_season']
        # del logData['curr_episode']
        del logData['rating']
        del logData['user_review']
        if contentType == 'tv_show':
            if status == 'completed': #TODO not sure if want_to_consume should be here
                for season_num in range(1, numSeasons + 1):
                    for episode_num in range(1, int(season_num_parts(contentID, season_num)) + 1): # go through all of the episodes including the last
                        #need to get the ID of the content part corresponding to the season and episode numbers
                        currPart = db.session.execute(db.select(ContentPart).filter_by(content_id=contentID, season_num=season_num, episode_num=episode_num)).scalar_one_or_none()
                        if currPart:
                            db.session.add(LoggedContent(**logData, status=status, content_part_ref=currPart, user_id=session['user_id']))
                        else:
                            continue #TODO decide what the best way is to handle a situation where not all the episodes are logged
            elif status != 'want_to_consume':
                currSeasonNum = int(logData['curr_season'])
                currEpisodeNum = int(logData['curr_episode'])
                del logData['curr_season']
                del logData['curr_episode']
                for season_num in range(1, currSeasonNum): #populate every season before current season with completed logs
                    for episode_num in range(1, int(season_num_parts(contentID, season_num)) + 1):
                        #need to get the ID of the content part corresponding to the season and episode numbers
                        currPart = db.session.execute(db.select(ContentPart).filter_by(content_id=contentID, season_num=season_num, episode_num=episode_num)).scalar_one_or_none()
                        if currPart:
                            db.session.add(LoggedContent(**logData, status='completed', content_part_ref=currPart, user_id=session['user_id']))
                        else:
                            continue
                #now log episodes in the current season as completed
                for episode_num in range(1, currEpisodeNum):
                    currPart = db.session.execute(db.select(ContentPart).filter_by(content_id=contentID, season_num=currSeasonNum, episode_num=episode_num)).scalar_one_or_none()
                    if currPart:
                        db.session.add(LoggedContent(**logData, status='completed', content_part_ref=currPart, user_id=session['user_id']))
                    else:
                        continue
                #now log the current episode as in progress (TODO see if this is the best approach)
                currPart = db.session.execute(db.select(ContentPart).filter_by(content_id=contentID, season_num=currSeasonNum, episode_num=currEpisodeNum)).scalar_one_or_none()
                if currPart:
                    db.session.add(LoggedContent(**logData, status='in_progress', content_part_ref=currPart, user_id=session['user_id']))
        db.session.add(LoggedContent(**logData, status=status, content_id=contentID, rating=rating, user_review=userReview, user_id=session['user_id']))
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
