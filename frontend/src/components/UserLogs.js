import "../App.css";
import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

function UserLogs() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
    //TODO: build query params based on user selections from filter dropdowns
    useEffect(() => {
        fetch("/api/logged_content?status=in_progress").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata(data);
            })
        );
    }, []);
    
    if ('error' in data) { //TODO: component being able to redirect is kind of trash but idk
        navigate("/login");
        return;
    }
    return (
    <>
        {data.map((datum) => <ContentBox image_height={175} title={datum.title} image={datum.picture}/>)}
    </>
    )
}

export default UserLogs;