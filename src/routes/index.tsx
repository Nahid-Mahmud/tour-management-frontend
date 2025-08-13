import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/user/Bookings";
import Verify from "@/pages/Verify";
import generateRoutes from "@/utils/generateRoutes";

import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

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
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/user",
    element: <DashboardLayout />,
    children: [{ path: "bookings", element: <Bookings /> }],
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
