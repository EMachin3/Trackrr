import "../App.css";
//import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import filterBoxes from "../config/filterBoxes";
import FilterSettings from "./FilterSettings.js";
import KeywordSearch from "./KeywordSearch.js";
import SelectContentBox from "./SelectContentBox.js";
//import AddEpisodeForm from "./AddEpisodeForm.js";
import UpdateContentForm from "./UpdateContentForm.js";

function UserLogs() {
  const [data, setdata] = useState([]);
  //TODO: filterParams might not be a good name for this
  const [filterParams, setFilterParams] = useState(filterBoxes);
  // const [queryURL, setQueryURL] = useState(`/api/logged_content?${new URLSearchParams({'status': filterBoxes.statusBoxes.filter((filterBox) => filterBox.checked).map((filterBox) => filterBox.checkName)})}`)
  const [keywords, setKeywords] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const navigate = useNavigate();

  function handleSelect(e) {
    e.preventDefault();
    if (selectedLog === Number(e.target.id)) {
      //toggle dropdown off
      setSelectedLog(null);
    } else {
      setSelectedLog(Number(e.target.id));
    }
  }

  useEffect(() => {
    //fetch("/api/logged_content?status=in_progress").then((res) =>
    const params = new URLSearchParams({
      status: filterParams.statusBoxes
        .filter((filterBox) => filterBox.checked)
        .map((filterBox) => filterBox.checkName),
      content_type: filterParams.contentTypes
        .filter((contentType) => contentType.checked)
        .map((contentType) => contentType.checkName),
    });
    if (keywords !== null && keywords !== "") {
      params.append("search_query", keywords);
    }
    //console.log(params);
    fetch(`/api/logged_content?${params}`).then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata(data);
      }),
    );
  }, [filterParams, keywords]);

  if ("error" in data) {
    //TODO: component being able to redirect is kind of trash but idk
    navigate("/login");
    return;
  }
  return (
    <>
      <FilterSettings
        filterParams={filterParams}
        setFilterParams={setFilterParams} /*setQueryURL={setQueryURL}*/
      />
      <KeywordSearch setKeywords={setKeywords} />
      {data.map((datum, index) => {
        return (
          <div>
            <SelectContentBox
              title={datum.title}
              image={datum.picture}
              image_height={175}
              index={index}
              handleSelect={handleSelect}
            />
            {selectedLog === index && (
              <>
                <UpdateContentForm
                  contentID={datum.id}
                  contentTitle={datum.title}
                  contentDescription={datum.description}
                  contentType={datum.type}
                  currentContentStatus={datum.status}
                  currentContentRating={datum.rating}
                  currentContentReview={datum.user_review}
                  currentContentPlaytime={datum.playtime}
                  currentSeason={datum.curr_season}
                  currentEpisode={datum.curr_episode}
                  setSelectedLog={setSelectedLog}
                  contentNumSeasons={datum.num_seasons}
                />
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default UserLogs;
