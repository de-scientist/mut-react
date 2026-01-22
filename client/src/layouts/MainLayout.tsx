import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAOS } from "../hooks/useAOS";
import "../styles/layout.css";

const MainLayout = () => {
  useAOS();

  return (
    <div className="app-root d-flex flex-column min-vh-100">
      <Navbar />
      <main
        className="flex-grow-1"
        style={{ paddingTop: "80px", width: "100%" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
