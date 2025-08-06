import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
