import "../App.css";
//import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React } from "react";
import ContentSearch from "../components/ContentSearch.js";
import UserLogs from "../components/UserLogs.js";

function Home() {
  //TODO: do something if you go here but aren't signed in, see commented code on UserLogs
  //TODO: add a default "no image found" thing
  return (
    <>
      <header className="App-header">
        <h1>Welcome back. Let's log some content.</h1>
        <UserLogs />
        {/* <ContentSearch /> This component was here for testing, but it actually belongs within other future components */}
      </header>
    </>
  );
}

export default Home;
