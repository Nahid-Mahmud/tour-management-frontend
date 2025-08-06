import MainLayout from "@/components/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
    ],
  },
]);

export default routes;
