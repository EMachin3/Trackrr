import "../App.css";
import { React } from "react";
function Landing() {
  return (
    <header className="App-header">
      <h1>Welcome to Trackrr</h1>
      <h3>the simple content logging service</h3>
      <a href="/login">
        <button>Log in</button>
      </a>
    </header>
  );
}

export default Landing;
