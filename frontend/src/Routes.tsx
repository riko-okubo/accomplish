import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { Welcome } from "./pages/Welcome";

export const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "home", element: <Home /> },
  { path: "taskdetail/:id", element: <TaskDetailPage /> },
]);
