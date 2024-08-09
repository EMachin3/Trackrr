import React, { useState, useEffect } from "react";
import { /*createSearchParams,*/ useNavigate } from "react-router-dom";

function UpdateContentForm({
  contentID,
  contentType,
  contentTitle,
  contentDescription,
  contentNumSeasons,
  currentContentStatus,
  currentContentRating,
  currentContentReview,
  currentSeason,
  currentEpisode,
  currentContentPlaytime,
  setSelectedLog,
}) {
  const navigate = useNavigate();

  const [contentStatus, setContentStatus] = useState(currentContentStatus);
  const [seasonNum, setSeasonNum] = useState(1);
  const [seasonNumEpisodes, setSeasonNumEpisodes] = useState(null);

  useEffect(() => {
    fetch(`/api/content/${contentID}/count_season_parts/${seasonNum}`).then(
      (res) =>
        res.json().then((data) => {
          // Setting a data from api
          setSeasonNumEpisodes(data);
        }),
    );
  }, [seasonNum, contentID]);
  function updateLog(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/api/logged_content", { method: "put", body: formData }); //TODO: probably do error handling or something
    setSelectedLog(null);
    //const queryParams = new URLSearchParams({'content_type' : formData['content_type'], });
    //navigate(`/home?${queryParams}`);
    //TODO: do something with query params so that filters are saved on refresh.
    //a refresh is needed to reflect on the frontend the changes that have occurred on the database side.
    navigate(0);

    // navigate({
    //   pathname: ".",
    //   search: createSearchParams(formData).toString()
    // });
  }

  return (
    <form
      /*action="/api/logged_content" method="put"*/ onSubmit={(e) =>
        updateLog(e)
      }
      class="form-example"
    >
      {" "}
      <div class="form-example">
        <input
          type="hidden"
          name="content_type"
          id="content_type"
          value={contentType}
        />
      </div>
      {contentType === "tv_show" && (
        <div class="form-example">
          <input
            type="hidden"
            name="content_num_seasons"
            id="content_num_seasons"
            value={contentNumSeasons}
          />
        </div>
      )}
      {/*target="dummyframe"*/}
      <div class="form-example">
        <label>Content type: {contentType}</label>
      </div>
      <div class="form-example">
        <label>Title: {contentTitle}</label>
      </div>
      <div class="form-example">
        <label>Description: {contentDescription}</label>
      </div>
      <div class="form-example">
        <label for="status">Status: </label>
        <select
          id="status"
          name="status"
          defaultValue={currentContentStatus}
          onChange={(e) => setContentStatus(e.target.value)}
          required
        >
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="want_to_consume">Want to Consume</option>
          <option value="on_hold">On Hold</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>
      <div class="form-example">
        <label for="rating">Rating: </label>
        <input
          type="number"
          name="rating"
          id="rating"
          min="0"
          max="10"
          step="0.1"
          defaultValue={currentContentRating}
        />
      </div>
      <div class="form-example">
        <label for="title">Review: </label>{" "}
        {/* TODO make this input the thing where you can drag and expand the box */}
        <input
          type="text"
          name="user_review"
          id="user_review"
          defaultValue={currentContentReview}
        />
      </div>
      {/* TODO: figure out some logical way to log episodes*/}
      {contentType === "video_game" && (
        <div class="form-example">
          <label for="playtime">Playtime (hours): </label>
          <input
            type="number"
            name="playtime"
            id="playtime"
            min="0"
            defaultValue={currentContentPlaytime}
          />
        </div>
      )}
      {contentType === "tv_show" &&
        !["completed", "want_to_consume"].includes(contentStatus) && (
          <div class="form-example">
            <label for="curr_season">Current season: </label>
            <input
              type="number"
              name="curr_season"
              defaultValue={currentSeason || "1"}
              id="curr_season"
              min="1"
              max={contentNumSeasons}
              step="1"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setSeasonNum(e.target.value);
                }
              }}
            />
            <label for="curr_episode">Current episode: </label>
            <input
              type="number"
              name="curr_episode"
              defaultValue={currentEpisode || "1"}
              id="curr_episode"
              min="1"
              max={seasonNumEpisodes} //TODO: for some reason, the max for better call saul s2 is sometimes set to 2 initially, but gets set to 3 after toggling the season number
            />
          </div>
        )}
      <div class="form-example">
        <input
          type="hidden"
          name="content_id"
          id="content_id"
          value={contentID}
        />
      </div>
      <div class="form-example">
        <input type="submit" value="Log Content" />
      </div>
    </form>
  );
}

export default UpdateContentForm;
