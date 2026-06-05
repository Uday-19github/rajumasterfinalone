import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1 pt-16 md:pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
