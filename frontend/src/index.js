import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login';
import Home from './components/Home';
import Landing from './components/Landing';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Landing />
      )
    },
    {
      path: '/login',
      element: (
        <Login />
      )
    },
    {
      path: '/home',
      element: (
        <>
        <Home />
        </>
      )
    }
  ]  
)

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(
  <RouterProvider router={router} />
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
