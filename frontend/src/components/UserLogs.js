import "../App.css";
import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import filterBoxes from "../config/filterBoxes";
import FilterSettings from "./FilterSettings.js";

function UserLogs() {
  const [data, setdata] = useState([]);
  //TODO: filterParams might not be a good name for this
  const [filterParams, setFilterParams] = useState(filterBoxes);
  // const [queryURL, setQueryURL] = useState(`/api/logged_content?${new URLSearchParams({'status': filterBoxes.statusBoxes.filter((filterBox) => filterBox.checked).map((filterBox) => filterBox.checkName)})}`)
  const navigate = useNavigate();
  useEffect(() => {
    //fetch("/api/logged_content?status=in_progress").then((res) =>
    const params = new URLSearchParams({ status: filterParams.statusBoxes.filter((filterBox) => filterBox.checked).map((filterBox) => filterBox.checkName), content_type: filterParams.contentTypes.filter((contentType) => contentType.checked).map((contentType) => contentType.checkName) });
    //console.log(params);
    fetch(
      `/api/logged_content?${params}`,
    ).then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata(data);
      }),
    );
  }, [filterParams]);

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
      {data.map((datum) => (
        <ContentBox
          image_height={175}
          title={datum.title}
          image={datum.picture}
        />
      ))}
    </>
  );
}

export default UserLogs;
