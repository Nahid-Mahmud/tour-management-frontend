import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export default function getSidebarItems(userRole: TRole) {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems, ...userSidebarItems];
    case role.user:
      return [...userSidebarItems];
    case role.admin:
      return [...adminSidebarItems];

    default:
      return [];
  }
}
