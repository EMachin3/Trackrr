import React from "react";
//import { useNavigate } from "react-router-dom";
import AddContentForm from "../components/AddContentForm";
import "../App.css";

function AddContent() {
  // const [selectedContentType, setSelectedContentType] = useState("tv_show");
  //const navigate = useNavigate(); //TODO: make it so only signed in people can add content (/api/signed_in?)
  // const [finished, setFinished] = useState(true);
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Add New Content</h1>
          <AddContentForm />
        </header>
      </div>
    </>
  );
}

export default AddContent;
