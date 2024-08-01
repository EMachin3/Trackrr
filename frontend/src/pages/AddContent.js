import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../App.css";

function AddContent() {
  const [selectedContentType, setSelectedContentType] = useState("tv_show");
  //const navigate = useNavigate(); //TODO: make it so only signed in people can add content (/api/signed_in?)
  // const [finished, setFinished] = useState(true);
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Add New Content</h1>
          <form action="/api/content" method="post" class="form-example">
            {" "}
            {/*target="dummyframe"*/}
            <div class="form-example">
              <label for="content_type">Content type: </label>
              <select id="content_type" name="content_type" onChange={(e) => setSelectedContentType(e.target.value)} required>
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
            {/* TODO: if you select TV show add options for number of seasons and episodes as well as a check box for in progress */}
            {selectedContentType === "tv_show" /*&& finished*/ && (
              <>
              <div class="form-example">
                <label for="num_seasons">Number of seasons: </label>
                <input type="text" name="num_seasons" id="num_seasons" required />
              </div>
              <div class="form-example">
              <label for="num_episodes">Number of episodes: </label>
              <input type="text" name="num_episodes" id="num_episodes" required />
              </div>
              <div class="form-example">
              <label for="finished_airing">Finished Airing: </label>
              <input type="checkbox" name="finished_airing" id="finished_airing" value="finished_airing" defaultChecked="true" />
              </div>
              </>
            )}
            <div class="form-example">
              <input type="submit" value="Add Content" />
            </div>
          </form>
        </header>
      </div>
    </>
  );
}

export default AddContent;
