import datetime
import uuid
from typing import Optional, List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import UUID, ForeignKey, Integer, String, DateTime, func
from database import db
from dataclasses import dataclass

@dataclass
class Content(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    content_type: Mapped[str] #TODO: duplicate field with content_collection, duplication might be necessary for polymorphism though
    title: Mapped[str]
    descr: Mapped[Optional[str]]
    picture: Mapped[Optional[str]]
    logs: Mapped[List["LoggedContent"]] = relationship("LoggedContent", backref="content_ref")
    collection_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content_collection.id"))
    #todo: maybe store info about amount of people who have it logged?
    __mapper_args__ = {
        "polymorphic_on": "content_type",
        "polymorphic_identity": "content",
    }

@dataclass
class ContentCollection(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    content_type: Mapped[str]
    title: Mapped[str] = mapped_column(String, unique=True)
    descr: Mapped[Optional[str]]
    picture: Mapped[Optional[str]]
    logs: Mapped[List["LoggedContent"]] = relationship("LoggedContent", backref="content_collection_ref")
    __mapper_args__ = {
        "polymorphic_on": "content_type",
        "polymorphic_identity": "content_collection",
    }
    
class TvShows(ContentCollection):
    # id: Mapped[int] = mapped_column(primary_key=True)
    # content_type: Mapped[str]
    # title: Mapped[str] = mapped_column(String, unique=True)
    # descr: Mapped[Optional[str]]
    # picture: Mapped[Optional[str]]
    num_seasons: Mapped[Optional[int]]
    num_episodes: Mapped[Optional[int]]
    # seasons: Mapped[List["TvSeasons"]] = relationship("TvSeasons", backref="show")
    episodes: Mapped[List["TvEpisodes"]] = relationship("TvEpisodes", backref="show")
    __mapper_args__ = {
        "polymorphic_identity": "tv_show",
    }

class MovieSeries(ContentCollection):
    # id: Mapped[int] = mapped_column(primary_key=True)
    # content_type: Mapped[str]
    # title: Mapped[str] = mapped_column(String, unique=True)
    # descr: Mapped[Optional[str]]
    # picture: Mapped[Optional[str]]
    num_movies: Mapped[Optional[int]]
    # seasons: Mapped[List["TvSeasons"]] = relationship("TvSeasons", backref="show")
    movies: Mapped[List["Movies"]] = relationship("Movies", backref="movie_series")
    __mapper_args__ = {
        "polymorphic_identity": "movie_series",
    }
    
# class TvSeasons(db.Model):
#     id: Mapped[int] = mapped_column(primary_key=True)
#     season_num: Mapped[Optional[int]]
#     num_episodes: Mapped[Optional[int]]
#     show_id: Mapped[int] = mapped_column(Integer, ForeignKey("content.id"))
#     # show: Mapped[TvShow] = relationship("Content", back_populates="seasons")
#     episodes: Mapped[List["TvEpisodes"]] = relationship("TvEpisodes", backref="season")
    
class TvEpisodes(Content):
    # id: Mapped[int] = mapped_column(primary_key=True)
    # content_type: Mapped[str]
    # title: Mapped[str]
    # descr: Mapped[Optional[str]]
    # picture: Mapped[Optional[str]]
    # logs: Mapped[List["LoggedContent"]] = relationship("LoggedContent", backref="content_ref")
    # collection_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content_collection.id"))
    season_num: Mapped[Optional[int]] #this being optional is not ideal but the other case forces other children to be not null for some reason
    episode_num: Mapped[Optional[int]]
    minutes_len: Mapped[Optional[int]]
    # season_id: Mapped[int] = mapped_column(Integer, ForeignKey("tv_seasons.id"))
    # season: Mapped[TvSeasons] = relationship("TvSeasons", back_populates="episodes")
    # show_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content_collection.id"))
    # show: Mapped[TvShow] = relationship("Content", back_populates="episodes")
    __mapper_args__ = {
        "polymorphic_identity": "tv_episode",
    }

@dataclass
class Users(db.Model):
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]
    logged_content: Mapped[List["LoggedContent"]] = relationship("LoggedContent", backref="user")

@dataclass
class LoggedContent(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    content_collection_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content_collection.id"))
    content_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content.id"))
    user_id: Mapped[int] = mapped_column(UUID, ForeignKey("users.id"))
    status: Mapped[str] # options: want_to_consume, consuming, finished, dropped. (probably could and should support want to watch/play/listen differentation)
    rating: Mapped[Optional[float]] #decimal from 0.0 to 10 in 0.1 increments
    user_review: Mapped[Optional[str]]
    playtime: Mapped[Optional[int]]
    #kinda want to subclass for playtime but also that would be repeating the content_type field
    #from content which we already have a foreign key for so probably not a good idea
    # __mapper_args__ = {
    #     "polymorphic_on": "content_type",
    #     "polymorphic_identity": "content",
    # }
    
class Movies(Content):
    # id: Mapped[int] = mapped_column(primary_key=True)
    # title: Mapped[str] = mapped_column(String, unique=True)
    # descr: Mapped[Optional[str]]
    # picture: Mapped[Optional[str]]
    # collection_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("content_collection.id"))
    __mapper_args__ = {
        "polymorphic_identity": "movie",
    }

@dataclass
class Books(db.Model):
    # def __init__(self, title, author, pages_num, review = None):
    #     self.title = title
    #     self.author = author
    #     self.pages_num = pages_num 
    #     self.review = review
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150))
    author: Mapped[str] = mapped_column(String(50))
    pages_num: Mapped[int]
    review: Mapped[Optional[str]]
    date_added: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), default=func.now())
