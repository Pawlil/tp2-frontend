import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  const ocultarNavbar = location.pathname === "/login";

  return (
    <>
      {!ocultarNavbar && <Navbar />}

      <main className="app-content">
        <Outlet />
        {!ocultarNavbar && <Footer />}
      </main>
    </>
  );
}

export default Layout;