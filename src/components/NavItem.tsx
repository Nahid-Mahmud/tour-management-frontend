import { NavLink } from "react-router";

export default function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "border-b-2 border-green-300 text-green-500" : ""
      }
      to={to}
    >
      {label}
    </NavLink>
  );
}
