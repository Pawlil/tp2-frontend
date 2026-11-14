
import { useEffect, useState } from "react";
import { obtenerPublicaciones, type Publicacion } from "../services/api";
import PostCard from "../components/PostCard";
import "./Home.css";

function Home(){
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    useEffect(() => {
  async function cargarPublicaciones() {
    try {
      const datos = await obtenerPublicaciones();
      setPublicaciones(datos);
    } catch (error) {
      console.error("Error al cargar publicaciones:", error);
    }
  }

  cargarPublicaciones();
}, []);
  
    return (
  <main className= "home-container">
    <h1>UnaHur Anti-Social Net</h1>
    <h2>Bienvenido, Juan</h2>

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
    )
}

export default Home;