import "../App.css";
import ContentCollectionBox from "./ContentCollectionBox.js";
import { redirect, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

function Home() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/api/logged_content?status=in_progress").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata(data);
            })
        );
    }, []);
    console.log(data) //TODO: integrate it into what's returned using approach from commented code on Login
    
    if ('error' in data) {
        navigate("/login"); //TODO: I feel like login shouldn't be home and should be /login, home should be like an intro page
    }
    return (
    <header className="App-header">
        <h1>Currently Watching</h1>
	{/* <ContentCollectionBox /> */}
    </header>
    )
}

export default Home;