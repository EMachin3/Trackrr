import "../App.css";
import ContentBox from "./ContentBox.js";
//import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

function UserLogs() {
    const [data, setdata] = useState([]);
    //TODO: build query params based on user selections from filter dropdowns
    useEffect(() => {
        fetch("/api/logged_content?status=in_progress").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata(data);
            })
        );
    }, []);
    // console.log(data) //TODO: integrate it into what's returned using approach from commented code on Login
    
    // if ('error' in data) {
    //     navigate("/login");
    //     return;
    // }
    return (
    <>
        {data.map((datum) => <ContentBox title={datum.title} image={datum.picture}/>)}
    </>
    )
}

export default UserLogs;