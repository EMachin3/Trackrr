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
-- select media.title, tv_season.season_num, tv_episode.episode_num, tv_episode.title, tv_episode.descr, tv_episode.minutes_len from tv_season                                                           
--   inner join tv_episode on tv_episode.season_id=tv_season.id
--   inner join media on media.id=tv_season.show_id where media.media_type='tv_show' order by (tv_season.season_num, tv_episode.episode_num);

-- below are some sample test queries (the commented ones above are probably outdated)

--get all user-logged movies and tv episodes
select content_collection.title, content.content_type, content.title, logged_content.status, logged_content.rating, logged_content.user_review from logged_content 
  inner join content on content.id=logged_content.content_id 
  left join content_collection on content.collection_id=content_collection.id
  where content.content_type in ('movie', 'tv_episode');

--get all stored content with reviews if they exist
select content_collection.title, content.content_type, content.title, logged_content.status, logged_content.rating, logged_content.user_review from logged_content 
  join content on content.id=logged_content.content_id 
  join content_collection on content.collection_id=content_collection.id;
  
  --better:
  -- get all logged content
  select content.title, content.content_type, logged_content.status, logged_content.rating, logged_content.user_review from logged_content join content on logged_content.content_id=content.id;
  -- get all logged content parts
  select content_part.title, content_part.content_type, logged_content.status, logged_content.rating, logged_content.user_review from logged_content join content_part on logged_content.content_part_id=content_part.id;
