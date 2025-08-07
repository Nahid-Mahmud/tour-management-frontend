import { ThemeProvider } from "@/providers/theme-provider";
import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme-preference">
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
