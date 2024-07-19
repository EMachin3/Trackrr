# import psycopg2
from app import app, Base, db
from models import *

# currently has some testing data, in the future the table won't be prepopulated
with app.app_context():
    Base.metadata.drop_all(db.engine, [TvEpisodes.__table__, LoggedContent.__table__, Users.__table__, ContentCollection.__table__, Books.__table__])
    db.create_all()
    db.session.add(Books(title='A Tale of Two Cities', author='Charles Dickens', pages_num=489, review='A great classic!'))
    show = TvShows(title="Better Call Saul", descr="A struggling lawyer tries to make a name for himself.", num_seasons=6, num_episodes=63)
    # db.session.add(show)
    # db.session.commit()
    # seasonOne = TvSeasons(season_num=1, num_episodes=10, show=show)
    # seasonTwo = TvSeasons(season_num=2, num_episodes=10, show=show)
    # show.seasons.append(seasonOne)
    # show.seasons.append(seasonTwo)
    # db.session.commit()
    s1e1 = TvEpisodes(title="Uno", descr="James McGill feels stuck as a public defendant, but sometimes, things change...", episode_num=1, minutes_len=53, season_num=1, show=show)
    s1e2 = TvEpisodes(title="Mijo", descr="Jimmy has to talk his way out of a difficult situation.", episode_num=2, minutes_len=46, season_num=1, show=show)
    # seasonOne.episodes.append(s1e1)
    # seasonOne.episodes.append(s1e2)
    s2e1 = TvEpisodes(title="Switch", descr="Jimmy gets a new job, while Mike deals with his new job", episode_num=1, minutes_len=47, season_num=2, show=show)
    s2e2 = TvEpisodes(title="Cobbler", descr="Jimmy has to get creative to get Mike's business associate out of trouble.", episode_num=2, minutes_len=47, season_num=2, show=show)
    # seasonTwo.episodes.append(s2e1)
    # seasonTwo.episodes.append(s2e2)
    db.session.add(show)
    
    godfather = Movies(title="The Godfather", descr="An old mafia boss's son gets more involved with his father's business.")
    # db.session.add(godfather)
    testuser = Users(username="test", email="test@example.org", password_hash="fdyujxerst")
    # db.session.add(testuser)
    loggedMovie = LoggedContent(user=testuser, content_ref=godfather, status='watched', rating=10.0, user_review='An all-time classic')
    loggedShow = LoggedContent(user=testuser, content_ref=s1e1, status='watched', rating=8.0, user_review='A good start to a GREAT show.')
    # db.session.add(loggedMovie)
    # db.session.add(loggedShow)
    db.session.add(testuser)
    db.session.commit()
    print("Database created and populated.")
# conn = psycopg2.connect(
#     host="localhost",
#     database="flask_db",
#     user=os.environ['DB_USERNAME'],
#     password=os.environ['DB_PASSWORD'])
# cur = conn.cursor()
# with open('schema.sql') as f:
#     cur.execute(f.read())

# # Open a cursor to perform database operations
# cur = conn.cursor()

# # Execute a command: this creates a new table
# cur.execute('DROP TABLE IF EXISTS books;')
# cur.execute('CREATE TABLE books (id serial PRIMARY KEY,'
#                                  'title varchar (150) NOT NULL,'
#                                  'author varchar (50) NOT NULL,'
#                                  'pages_num integer NOT NULL,'
#                                  'review text,'
#                                  'date_added date DEFAULT CURRENT_TIMESTAMP);'
#                                  )

# # Insert data into the table

# cur.execute('INSERT INTO books (title, author, pages_num, review)'
#             'VALUES (%s, %s, %s, %s)',
#             ('A Tale of Two Cities',
#              'Charles Dickens',
#              489,
#              'A great classic!')
#             )


# cur.execute('INSERT INTO books (title, author, pages_num, review)'
#             'VALUES (%s, %s, %s, %s)',
#             ('Anna Karenina',
#              'Leo Tolstoy',
#              864,
#              'Another great classic!')
#             )

# conn.commit()

# cur.close()
# conn.close()
