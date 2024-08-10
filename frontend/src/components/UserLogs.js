import "../App.css";
//import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate, useSearchParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import filterBoxes from "../config/filterBoxes";
import FilterSettings from "./FilterSettings.js";
import KeywordSearch from "./KeywordSearch.js";
import SelectContentBox from "./SelectContentBox.js";
//import AddEpisodeForm from "./AddEpisodeForm.js";
import UpdateContentForm from "./UpdateContentForm.js";
// import { useSearchParams } from "react-router-dom";

function UserLogs() {
  const [data, setdata] = useState([]);
  //TODO: for some reason, the useSearchParams constructor doesn't add the query params to the URL but does add them within React.
  //I can't set the query params using setSearchParams because that causes an infinite loop for some reason.
  //This code works but relies on the query params being appended to the redirect from the backend which makes no sense and should be
  //done within the front end code but I don't know how to do that right now
  const [searchParams] /*, setSearchParams]*/ = useSearchParams(
    filterBoxes.defaultSearchParams,
  );
  //setSearchParams({status: 'completed', content_type: 'tv_show'});
  // if (searchParams) {
  //   // searchParams.entries().forEach((searchParam) => console.log(searchParam));
  //   console.log(searchParams.getAll('content_type'));
  // }
  //console.log(searchParams.get('content_type'))
  if (searchParams.get("content_type") !== "") {
    searchParams
      .get("content_type")
      .split(",")
      .forEach((type) => {
        filterBoxes.contentTypes.find((box) => box.checkName === type).checked =
          true;
      });
  }
  if (searchParams.get("status") !== "") {
    searchParams
      .get("status")
      .split(",")
      .forEach((status) => {
        filterBoxes.statusBoxes.find(
          (box) => box.checkName === status,
        ).checked = true;
      });
  }
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
    const params = searchParams;
    // const params = new URLSearchParams({
    //   status: filterParams.statusBoxes
    //     .filter((filterBox) => filterBox.checked)
    //     .map((filterBox) => filterBox.checkName),
    //   content_type: filterParams.contentTypes
    //     .filter((contentType) => contentType.checked)
    //     .map((contentType) => contentType.checkName),
    // });
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
  }, [filterParams, keywords, searchParams]);

  if ("error" in data) {
    //TODO: component being able to redirect is kind of trash but idk
    navigate("/login");
    return;
  }
  return (
    <>
      {/*<p>{searchParams}</p>*/}
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
