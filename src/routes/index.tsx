import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/user/Bookings";
import Verify from "@/pages/Verify";

import { createBrowserRouter } from "react-router";

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
    children: [
      { path: "analytics", element: <Analytics /> },
      {
        path: "add-tour",
        element: <AddTour />,
      },
    ],
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
