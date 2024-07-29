import "../App.css";
import { React } from "react";
import FilterSettings from "../components/FilterSettings";
function Landing() {
    return (
    <header className="App-header">
        <h1>Welcome to Trackrr</h1>
        <h3>the simple content logging service</h3>
        <a href="/login">
            <button>Log in</button>
        </a>
	{/*<input type="checkbox" class="hidden" name="cb" id="cb" />
<label for="cb">text</label>*/}
	<FilterSettings />
    </header>
    )
}

export default Landing;
