// import Analytics from "@/pages/admin/Analytics";
import AddDivision from "@/pages/admin/AddDivision";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AddTourType = lazy(() => import("@/pages/admin/AddTourType"));
const AddTour = lazy(() => import("@/pages/admin/AddTour"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        element: <Analytics />,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        element: <AddTourType />,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        element: <AddDivision />,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        element: <AddTour />,
      },
    ],
  },
];
