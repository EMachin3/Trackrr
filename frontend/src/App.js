import React, { useState, useEffect } from "react";
import "./App.css";
 
function App() {
    // usestate for setting a javascript
    // object for storing and using data
    // const [data, setdata] = useState({
    //    name: "",
    //    age: 0,
    //    date: "",
    //    programming: "",
    // });
    const [data, setdata] = useState([]);
    // const [data, setdata] = useState(null);
 
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        // fetch("/data").then((res) =>
        //     res.json().then((data) => {
        //         // Setting a data from api
        //         setdata({
        //             name: data.Name,
        //             age: data.Age,
        //             date: data.Date,
        //             programming: data.programming,
        //         });
        //     })
        // );
        fetch("/data").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata(data);
            })
        );
    }, []);
 
    return (
        <div className="App">
            <header className="App-header">
                <h1>Books</h1>
                {/* Calling a data from setdata for showing */}
                {data.map((book) => (
                    <>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    </>
                ))}
                {/* {data.map((data) => (
                    
                ))} */}
 
            </header>
        </div>
    );
}
 
export default App;
