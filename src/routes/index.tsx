import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import generateRoutes from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [{ index: true, element: <Navigate to={"/admin/analytics"} /> }, ...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/user",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/user/bookings"} />,
      },
      ...generateRoutes(userSidebarItems),
    ],
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
    path: "/verify",
    element: <Verify />,
  },
]);

export default routes;
