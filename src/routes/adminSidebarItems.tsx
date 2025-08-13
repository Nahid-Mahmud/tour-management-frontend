import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";

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
        title: "Add Tour",
        url: "/admin/add-tour",
        element: <AddTour />,
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        element: <AddTourType />,
      },
    ],
  },
];
