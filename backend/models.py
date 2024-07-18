import datetime
from typing import Optional, List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Integer, String, DateTime, func
from app import db

class TvShow(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String, unique=True)
    descr: Mapped[Optional[str]]
    picture: Mapped[Optional[str]]
    num_seasons: Mapped[Optional[int]]
    num_episodes: Mapped[Optional[int]]
    seasons: Mapped[List["TvSeason"]] = relationship("TvSeason", back_populates="show")
    episodes: Mapped[List["TvEpisode"]] = relationship("TvEpisode", back_populates="show")
    
class TvSeason(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    season_num: Mapped[Optional[int]]
    num_episodes: Mapped[Optional[int]]
    show_id: Mapped[int] = mapped_column(Integer, ForeignKey("tv_show.id"))
    show: Mapped[TvShow] = relationship("TvShow", back_populates="seasons")
    episodes: Mapped[List["TvEpisode"]] = relationship("TvEpisode", back_populates="season")
    
class TvEpisode(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[Optional[str]] = mapped_column(String, unique=True)
    descr: Mapped[Optional[str]]
    episode_num: Mapped[int]
    minutes_len: Mapped[Optional[int]]
    season_id: Mapped[int] = mapped_column(Integer, ForeignKey("tv_season.id"))
    season: Mapped[TvSeason] = relationship("TvSeason", back_populates="episodes")
    show_id: Mapped[int] = mapped_column(Integer, ForeignKey("tv_show.id"))
    show: Mapped[TvShow] = relationship("TvShow", back_populates="episodes")

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
    date_added: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())