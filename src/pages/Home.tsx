

import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { obtenerPublicaciones, type Publicacion } from "../services/api";
import { useAuth } from "../context/useAuth";
import CrearPostModal from "../components/crearPost";
import PostCard from "../components/PostCard";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const location = useLocation();

  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  const [showAccountCreated, setShowAccountCreated] = useState(
    location.state?.accountCreated === true
  );

  useEffect(() => {
    // Evita que el mensaje de registro vuelva a aparecer al recargar Home.
    if (location.state?.accountCreated) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

const cargarPublicaciones = useCallback(async () => {
    try {
      const datos = await obtenerPublicaciones();

      setPublicaciones(
        [...datos].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.error("Error al cargar publicaciones:", error);
    }
  }, []);

  useEffect(() => {
    cargarPublicaciones();
  }, [cargarPublicaciones]);

  return (
    <main className="home-container">
      <section className="home-banner">
        <h1>¡Bienvenido a UnaHur Anti-Social Net</h1>

        <h3>¡Hola, {user?.nickName ?? "usuario"}!</h3>

        {/* MENSAJE DE REGISTRO EXITOSO */}
        {showAccountCreated && (
          <div className="account-created-message" role="alert">
            <div className="account-created-content">
              <strong>¡Cuenta creada correctamente!</strong>
              <p>
                ¡Bienvenido a UnaHur Anti-Social Net!
                  Tu contraseña para futuros ingresos es <strong>123456</strong>.
              </p>
            </div>

            <button
              type="button"
              className="account-created-close"
              onClick={() => setShowAccountCreated(false)}
              aria-label="Cerrar mensaje"
            >
              ×
            </button>
          </div>
        )}

        <p>¿Qué está pasando hoy? Compartilo con la comunidad.</p>
        <CrearPostModal onPostCreado={cargarPublicaciones} />
      </section>

      <section className="posts-feed">
        {publicaciones.length === 0 ? (
          <p>Todavía no hay publicaciones.</p>
        ) : (
          publicaciones.map((publicacion) => (
            <PostCard
              key={publicacion.id}
              publicacion={publicacion}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Home;

