import "../App.css";
import ContentBox from "./ContentBox.js";
//import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import ContentSearch from "./ContentSearch";
import UserLogs from "./UserLogs.js";

function Home() {
    return (
        <>
            <header className="App-header">
                <h1>Welcome back. Let's log some content.</h1>
                <UserLogs />
                <ContentSearch />

            </header>
        </>
    )
}

export default Home;
