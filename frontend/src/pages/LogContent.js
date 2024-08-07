import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import ContentSearch from "../components/ContentSearch";
import LogContentForm from "../components/LogContentForm";
import "../App.css";

function LogContent() {
  // const [selectedContentType, setSelectedContentType] = useState("tv_show");
  //const navigate = useNavigate(); //TODO: make it so only signed in people can add content (/api/signed_in?)
  const [selectedContent, setSelectedContent] = useState(null);
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Log Content</h1>
          {!selectedContent && (
            <>
              <ContentSearch setSelectedContent={setSelectedContent} />
            </>
          )}
          {selectedContent && (
            <>
              <LogContentForm
                contentID={selectedContent.id}
                contentType={selectedContent.content_type}
                contentTitle={selectedContent.title}
                contentDescription={selectedContent.description}
                contentNumSeasons={selectedContent.num_seasons}
                // contentNumEpisodes={selectedContent.num_episodes}
              />
            </>
          )}
        </header>
      </div>
    </>
  );
}

export default LogContent;
