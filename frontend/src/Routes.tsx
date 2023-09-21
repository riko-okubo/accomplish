import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "home", element: <Home /> },
]);
