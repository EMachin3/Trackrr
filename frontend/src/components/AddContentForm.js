import React, { useState } from "react";
import SeasonBox from "./SeasonBox";
import EpisodeBox from "./EpisodeBox";
import AddEpisodeForm from "./AddEpisodeForm";

function AddContentForm() {
  const [selectedContentType, setSelectedContentType] = useState("tv_show");
  const [tvSeasons, setTvSeasons] = useState([[]]);
  const [addingEpisodeSeason, setAddingEpisodeSeason] = useState(null);

  function addSeason(e) {
    e.preventDefault();
    setTvSeasons([...tvSeasons, []]);
  }

  function addEpisode(e) {
    e.preventDefault();
    //console.log(`Description: ${e.target.descr.value} for Season ${addingEpisodeSeason}`);
    tvSeasons[addingEpisodeSeason].push({
      title: e.target.title.value,
      descr: e.target.descr.value,
      picture: e.target.picture.value,
      minutes_len: e.target.minutes_len.value,
    });
    setTvSeasons(tvSeasons);
    setAddingEpisodeSeason(null);
    // console.log(tvSeasons);
    // return false;
  }

  return (
    <div>
      <form action="/api/content" method="post" class="form-example">
        {" "}
        {/*target="dummyframe"*/}
        <div class="form-example">
          <input
            type="hidden"
            name="content_parts"
            id="content_parts"
            value={JSON.stringify(tvSeasons)}
          />
        </div>
        <div class="form-example">
          <label for="content_type">Content type: </label>
          <select
            id="content_type"
            name="content_type"
            onChange={(e) => setSelectedContentType(e.target.value)}
            required
          >
            <option value="tv_show">TV Show</option>
            <option value="video_game">Game</option>
            <option value="book">Book</option>
            <option value="music">Music</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>
        <div class="form-example">
          <label for="title">Title: </label>
          <input type="text" name="title" id="title" required />
        </div>
        <div class="form-example">
          <label for="descr">Description (optional): </label>
          <input type="text" name="descr" id="descr" />
        </div>
        <div class="form-example">
          <label for="picture">Picture (optional): </label>
          <input type="file" name="picture" id="picture" />
        </div>
        {selectedContentType === "tv_show" /*&& finished*/ && (
          <>
            <div class="form-example">
              <label for="num_seasons">Number of seasons: </label>
              <input
                type="number"
                name="num_seasons"
                id="num_seasons"
                min="0"
                step="1"
                required
              />
            </div>
            <div class="form-example">
              <label for="num_episodes">Number of episodes: </label>
              <input
                type="number"
                name="num_episodes"
                id="num_episodes"
                min="0"
                step="1"
                required
              />
            </div>
            <div class="form-example">
              <label for="finished_airing">Finished Airing: </label>
              <input
                type="checkbox"
                name="finished_airing"
                id="finished_airing"
                value="finished_airing"
                defaultChecked="true"
              />
            </div>
          </>
        )}
        <div class="form-example">
          <input type="submit" value="Add Content" />
        </div>
        {selectedContentType && (
          <button onClick={(e) => addSeason(e)}>Add Season</button>
        )}
      </form>
      {tvSeasons &&
        tvSeasons.map((season, season_index) => {
          return (
            <>
              <SeasonBox
                season_index={season_index}
                setAddingEpisodeSeason={setAddingEpisodeSeason}
              />
              {season.map((episode, episode_index) => {
                return (
                  <EpisodeBox
                    title={episode.title}
                    season_index={season_index}
                    episode_index={episode_index}
                    picture={episode.picture}
                    image_height={50}
                  />
                );
              })}
              {addingEpisodeSeason != null &&
                addingEpisodeSeason === season_index && (
                  <AddEpisodeForm handleSubmit={(e) => addEpisode(e)} />
                )}
            </>
          );
        })}
    </div>
  );
}

export default AddContentForm;
