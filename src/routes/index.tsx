import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
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
    children: [{ path: "analytics", element: <Analytics /> }],
  },
  {
    path: "/user",
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
