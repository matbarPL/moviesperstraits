import React from "react";
import { Redirect } from "react-router-dom";

// Route Views
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"
import Dashboard from "./views/Dashboard"
import Admin from "./layouts/Admin/Admin"

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/black-dashboard-react" />
  },
  {
    path: "/sign-in",
    layout: Admin,
    component: SignIn
  },
  {
    path: "/sign-up",
    layout: Admin,
    component: SignUp
  },
  {
    path: "/black-dashboard-react",
    layout: Admin,
    component: Dashboard
  }
];