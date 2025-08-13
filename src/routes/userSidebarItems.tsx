import Bookings from "@/pages/user/Bookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "Booking Details",
        url: "/user/bookings",
        element: <Bookings />,
      },
    ],
  },
];
