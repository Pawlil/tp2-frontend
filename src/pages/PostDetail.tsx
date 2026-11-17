import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";


import {
  obtenerPublicacion,
  crearComentario,
  type Publicacion,
} from "../services/api";

function PostDetail() {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [contenidoComentario, setContenidoComentario] = useState("");

  const { user: usuario } = useAuth();

  useEffect(() => {
  async function cargarPublicacion() {
    try {
      if (!id) return;

      const datos = await obtenerPublicacion(id);

      setPublicacion(datos);
    } catch (error) {
      console.error("Error al cargar la publicación:", error);
    }
  }

  cargarPublicacion();
}, [id]);

if (!publicacion) {
  return (
    <main>
      <h1>Publicación no encontrada</h1>
      <p>No se pudo cargar la publicación solicitada.</p>
    </main>
  );
}

async function manejarEnvioComentario(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!contenidoComentario.trim()) {
    alert("El comentario no puede estar vacío");
    return;
  }

  if (!usuario || !publicacion) {
    alert("Debés iniciar sesión para comentar");
    return;
  }

  try {
    await crearComentario(
      contenidoComentario,
      usuario.id,
      publicacion.id
    );

    setContenidoComentario("");

    const datosActualizados = await obtenerPublicacion(publicacion.id.toString());

    setPublicacion(datosActualizados);

  } catch (error) {
    console.error("Error al crear el comentario:", error);
    alert("No se pudo publicar el comentario");
  }
}

  return (
  <main className="post-detail">
    <article className="post-detail-card">

      <header>
        <h2>{publicacion.user.nickName}</h2>
      </header>

      <p>{publicacion.description}</p>

      {publicacion.images.length > 0 && (
        <div className="post-detail-images">
          {publicacion.images.map((imagen) => (
            <img
              key={imagen.id}
              src={imagen.url}
              alt="Imagen de la publicación"
            />
          ))}
        </div>
      )}

      {publicacion.tags.length > 0 && (
        <div className="post-detail-tags">
          {publicacion.tags.map((etiqueta) => (
            <span key={etiqueta.id}>
              #{etiqueta.name}
            </span>
          ))}
        </div>
      )}
      <section className="post-detail-comments">
  <h3>Comentarios ({publicacion.comments.length})</h3>

  {publicacion.comments.length === 0 ? (
    <p>Todavía no hay comentarios.</p>
  ) : (
    publicacion.comments.map((comentario) => (
      <div key={comentario.id} className="comment">
        <h4>{comentario.user.nickName}</h4>
        <p>{comentario.content}</p>
      </div>
    ))
  )}
</section>
<form className="comment-form" onSubmit={manejarEnvioComentario}>
  <h3>Dejá tu comentario</h3>

  <textarea
    value={contenidoComentario}
    onChange={(e) => setContenidoComentario(e.target.value)}
    placeholder="Escribí tu comentario..."
    required
  />

  <button type="submit">
    Publicar comentario
  </button>
</form>
    </article>
  </main>
);
}

export default PostDetail;