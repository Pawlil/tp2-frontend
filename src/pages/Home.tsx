
import { useEffect, useState } from "react";
import { obtenerPublicaciones, type Publicacion } from "../services/api";
import { useAuth } from "../context/useAuth";
import PostCard from "../components/PostCard";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  useEffect(() => {
    async function cargarPublicaciones() {
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
    }

    cargarPublicaciones();
  }, []);

  return (
    <main className="home-container">
      <section className="home-banner">
              <h1>¡Bienvenido a UnaHur Anti-Social Net</h1>
        <h3>¡Hola, {user?.nickName ?? "usuario"}!</h3>
        <p>¿Qué está pasando hoy? Compartilo con la comunidad.</p>

        <button type="button" className="home-create-button">
          Haz una publicación
        </button>
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
