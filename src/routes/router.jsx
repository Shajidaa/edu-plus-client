import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Overview from "../pages/Dashboard/Overview";
import Profile from "../pages/Dashboard/Profile";
import Settings from "../pages/Dashboard/Settings";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./roleRoute";
import MyTuitions from "../pages/Dashboard/studentDashboard/MyTuitions";
import PostTuition from "../pages/Dashboard/studentDashboard/PostTuition";
import AppliedTutors from "../pages/Dashboard/studentDashboard/AppliedTutors";
import Payments from "../pages/Dashboard/studentDashboard/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      // ----------------- STUDENT ROUTES -----------------
      {
        path: "my-tuitions",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <MyTuitions />
          </RoleRoute>
        ),
      },
      {
        path: "post-tuition",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <PostTuition />
          </RoleRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <AppliedTutors />
          </RoleRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <Payments />
          </RoleRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
