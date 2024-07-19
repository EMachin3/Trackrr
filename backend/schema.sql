DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS tv_episode;
DROP TABLE IF EXISTS tv_season;
DROP TABLE IF EXISTS tv_show;

CREATE TABLE tv_show (
  id serial PRIMARY KEY,
  title text NOT NULL UNIQUE,
  descr text, -- description is a reserved keyword for some godforsaken reason
  picture text, -- or whatever a URI would be (ooh self hosting image server could be fun)
  num_seasons integer, -- not not null because it could be not released yet
  num_episodes integer -- "
);

CREATE TABLE tv_season (
  id serial PRIMARY KEY,
  season_num integer NOT NULL,
  num_episodes integer,
  show integer,
  CONSTRAINT fk_show
    FOREIGN KEY (show)
      REFERENCES tv_show(id)
);

CREATE TABLE tv_episode (
  id serial PRIMARY KEY,
  title text,
  descr text,
  episode_num integer NOT NULL,
  season integer,
  show integer,
  minutes_len integer,
  CONSTRAINT fk_season
    FOREIGN KEY (season)
      REFERENCES tv_season(id),
  CONSTRAINT fk_show
    FOREIGN KEY (show)
      REFERENCES tv_show(id)
);

CREATE TABLE books (
  id serial PRIMARY KEY,
  title varchar (150) NOT NULL,
  author varchar (50) NOT NULL,
  pages_num integer NOT NULL,
  review text,
  date_added date DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, pages_num, review)
  VALUES ('A Tale of Two Cities', 'Charles Dickens', 489, 'A great classic!');

INSERT INTO tv_show (title, descr, num_seasons, num_episodes) 
  VALUES ('Better Call Saul', 'A struggling lawyer tries to make a name for himself, maybe not in the most legal way possible...', 6, 63);

INSERT INTO tv_season (season_num, num_episodes, show) 
  VALUES (1, 42, (SELECT id FROM tv_show WHERE title='Better Call Saul'));
INSERT INTO tv_season (season_num, num_episodes, show) 
  VALUES (2, 69, (SELECT id FROM tv_show WHERE title='Better Call Saul'));
INSERT INTO tv_episode (episode_num, minutes_len, season, show) 
  VALUES (1, 22, (SELECT id FROM tv_season WHERE season_num=1 
  AND show=(SELECT id FROM tv_show WHERE title='Better Call Saul')), 
  (SELECT id FROM tv_show WHERE title='Better Call Saul'));
INSERT INTO tv_episode (episode_num, minutes_len, season, show) 
  VALUES (2, 24, (SELECT id FROM tv_season WHERE season_num=1 
  AND show=(SELECT id FROM tv_show WHERE title='Better Call Saul')), 
  (SELECT id FROM tv_show WHERE title='Better Call Saul'));
-- select tv_show.title, tv_show.descr, tv_season.season_num, tv_season.num_episodes 
--  from tv_season inner join tv_show on tv_show.id=tv_season.show_id;
-- idk why i have to select from tv_season for this to work but at this point i'm not going to question it
select media.title, tv_season.season_num, tv_episode.episode_num, tv_episode.title, tv_episode.descr, tv_episode.minutes_len from tv_season                                                           
 inner join tv_episode on tv_episode.season_id=tv_season.id
 inner join media on media.id=tv_season.show_id where media.media_type='tv_show' order by (tv_season.season_num, tv_episode.episode_num);