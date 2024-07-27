import "../App.css";
import { redirect, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

function Landing() {
    return (
    <header className="App-header">
        <h1>Welcome to Trackrr</h1>
        <h3>the simple content logging service</h3>
        <a href="/login">
            <button>Log in</button>
        </a>
    </header>
    )
}

export default Landing;
