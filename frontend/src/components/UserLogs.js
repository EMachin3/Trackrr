import "../App.css";
import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import filterBoxes from "../config/filterBoxes"
import FilterSettings from "./FilterSettings.js";

function UserLogs() {
    const [data, setdata] = useState([]);
    //TODO: filterParams might not be a good name for this
    const [filterParams, setFilterParams] = useState(filterBoxes);
    //TODO: add query params from both genres and statuses
    // const [queryURL, setQueryURL] = useState(`/api/logged_content?${new URLSearchParams({'status': filterBoxes.statusBoxes.filter((filterBox) => filterBox.checked).map((filterBox) => filterBox.checkName)})}`)
    const navigate = useNavigate();
    //TODO: build query params based on user selections from filter dropdowns
    //also use React's reloading nonsense to your advantage by refreshing when query params change due to clicking on filters
    useEffect(() => {
        //fetch("/api/logged_content?status=in_progress").then((res) =>
        fetch(`/api/logged_content?${new URLSearchParams({'status': filterParams.statusBoxes.filter((filterBox) => filterBox.checked).map((filterBox) => filterBox.checkName)})}`).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata(data);
            })
        );
    }, [filterParams]);
    
    if ('error' in data) { //TODO: component being able to redirect is kind of trash but idk
        navigate("/login");
        return;
    }
    return (
    <>
        <FilterSettings filterParams={filterParams} setFilterParams={setFilterParams} /*setQueryURL={setQueryURL}*//>
        {data.map((datum) => <ContentBox image_height={175} title={datum.title} image={datum.picture}/>)}
    </>
    )
}

export default UserLogs;