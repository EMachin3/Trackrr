import React/*, { useState, useEffect }*/ from "react";
import "./App.css";

function Login() {
    // usestate for setting a javascript
    // object for storing and using data
    // const [data, setdata] = useState({
    //    name: "",
    //    age: 0,
    //    date: "",
    //    programming: "",
    // });
    // const [data, setdata] = useState([]);
    // // const [data, setdata] = useState(null);

    // // Using useEffect for single rendering
    // useEffect(() => {
    //     // Using fetch to fetch the api from 
    //     // flask server it will be redirected to proxy
    //     // fetch("/data").then((res) =>
    //     //     res.json().then((data) => {
    //     //         // Setting a data from api
    //     //         setdata({
    //     //             name: data.Name,
    //     //             age: data.Age,
    //     //             date: data.Date,
    //     //             programming: data.programming,
    //     //         });
    //     //     })
    //     // );
    //     fetch("/data").then((res) =>
    //         res.json().then((data) => {
    //             // Setting a data from api
    //             setdata(data);
    //         })
    //     );
    // }, []);

    return (
        <>
        {/* <iframe name="dummyframe" id="dummyframe" style={{display: "none"}}></iframe> */}
        <div className="App">
            <header className="App-header">
                <h1>Books</h1>
                <form action="/api/test" method="post" class="form-example"> {/*target="dummyframe"*/}
                    <div class="form-example">
                        <label for="username">Enter your username: </label>
                        <input type="text" name="username" id="username" required />
                    </div>
                    <div class="form-example">
                        <label for="password">Enter your password: </label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <div class="form-example">
                        <input type="submit" value="Subscribe!" />
                    </div>
                </form>

                {/* Calling a data from setdata for showing */}
                {/* {data.map((book) => (
                    <>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    </>
                ))} */}
                {/* {data.map((data) => (
                    
                ))} */}

            </header>
        </div>
        </>
    );
}

export default Login;
