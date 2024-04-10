import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HeroRegister from "./components/HeroRegister/HeroRegister";
import {Toaster} from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "heroRegister",
        element: <HeroRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
