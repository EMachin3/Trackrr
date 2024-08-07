import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddContent from "./pages/AddContent";
import LogContent from "./pages/LogContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/add_content",
    element: (
      <>
        <AddContent />
      </>
    ),
  },
  {
    path: "/log_content",
    element: (
      <>
        <LogContent />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
