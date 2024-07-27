# import psycopg2
from app import app
from database import Base, db
from models import *
import os

# currently has some testing data, in the future the table won't be prepopulated
with app.app_context():
    Base.metadata.drop_all(db.engine, [TvEpisodes.__table__, LoggedContent.__table__, Users.__table__, Content.__table__, Books.__table__])
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
    
    # godfatherSeries = MovieSeries(title="The Godfather Trilogy", descr="One of the most iconic mob movie trilogies of all time", num_movies=3)
    godfather = Movies(title="The Godfather Pt. 1", descr="An old mafia boss's son gets more involved with his father's business.")
    godfatherPart2 = Movies(title="The Godfather Pt. 2", descr="Michael Corelone serves as the Don of his crime family.")
    db.session.add(godfather)
    db.session.add(godfatherPart2)
    testuser = Users(username="test", email="test@example.org", password_hash=os.environ['TEST_USER_PASSWORD'])
    # db.session.add(testuser)
    loggedShow = LoggedContent(user=testuser, content_ref=show, status='watched', rating=9.5, user_review='A deserving successor to Breaking Bad that keeps getting better and better.')
    # loggedMovieSeries = LoggedContent(user=testuser, content_ref=godfatherSeries, status='in_progress')
    loggedMovieOne = LoggedContent(user=testuser, content_ref=godfather, status='watched', rating=10.0, user_review='An all-time classic')
    loggedMovieTwo = LoggedContent(user=testuser, content_ref=godfatherPart2, status='want to watch')
    loggedEpisodeOne = LoggedContent(user=testuser, content_part_ref=s1e1, status='watched', rating=8.0, user_review='A good start to a GREAT show.')
    loggedEpisodeTwo = LoggedContent(user=testuser, content_part_ref=s1e2, status='watched', rating=9.0, user_review='Yeah... this definitely isn\'t just a show about lawyers.')
    # adding more shows below to test the search functionality
    deathNote = TvShows(title="Death Note", descr="A bored student finds a book that will kill anyone whose name he writes in it...", num_seasons=1, num_episodes=37)
    deathNoteEpisode1 = TvEpisodes(title="Rebirth", descr="Light Yagami learns how the Death Note works and decides to use it to rid the world of evil.", episode_num=1, minutes_len=23, season_num=1, show=deathNote)
    deathNoteEpisode2 = TvEpisodes(title="Confrontation", descr="Light learns that his plan isn't going to be as easy as it seems...", episode_num=2, minutes_len=23, season_num=1, show=deathNote)
    mobPsycho100 = TvShows(title="Mob Psycho 100", descr="A student tries to learn to control his incredible psychic powers while exorcising various spirits with the help of a con artist.", num_seasons=1, num_episodes=12)
    onePunchMan = TvShows(title="One Punch Man", descr="An interesting super hero can defeat any of his enemies in just one punch.", num_seasons=2, num_episodes=24)
    # db.session.add(deathNote)
    # db.session.add(mobPsycho100)
    # db.session.add(onePunchMan)
    
    LoggedContent(user=testuser, content_ref=deathNote, status='watched', rating=9.0)
    LoggedContent(user=testuser, content_part_ref=deathNoteEpisode1, status='watched')
    LoggedContent(user=testuser, content_part_ref=deathNoteEpisode2, status='watched')
    LoggedContent(user=testuser, content_ref=mobPsycho100, status='in_progress')
    LoggedContent(user=testuser, content_ref=onePunchMan, status='in_progress')
    
    # db.session.add(loggedMovie)
    # db.session.add(loggedShow)
    db.session.add(testuser)
    db.session.commit()
    print("Database created and populated.")
