
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-icon">✦</span>
        <h2>
          UnaHur
          <span>Anti-Social Net</span>
        </h2>
      </div>

      <nav className="navbar-links">
        <NavLink to="/home" className="navbar-link">
          <span className="navbar-icon">🏠</span>
          <span>Inicio</span>
        </NavLink>

        <NavLink to="/perfil" className="navbar-link">
          <span className="navbar-icon">👤</span>
          <span>Mi perfil</span>
        </NavLink>
      </nav>

      <div className="navbar-bottom">
        <button
          className="navbar-logout"
          type="button"
          onClick={handleLogout}
        >
          <span className="navbar-icon">🔐</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
