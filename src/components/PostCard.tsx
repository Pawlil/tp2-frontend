import { Link } from "react-router-dom";
import type { Publicacion } from "../services/api";
import "./PostCard.css";

interface PostCardProps {
  publicacion: Publicacion;
}

function PostCard({ publicacion }: PostCardProps) {
  return (
    <article className="post-card">
      <header className="post-card-header">
  <img
    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
    alt="Foto de perfil"
    className="user-avatar"
  />
  <h3>{publicacion.user.nickName}</h3>
</header>
      <p>{publicacion.description}</p>

      {publicacion.images.length > 0 && (
        <div className="post-images">
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
        <div className="post-tags">
          {publicacion.tags.map((etiqueta) => (
            <span key={etiqueta.id}>
              #{etiqueta.name}
            </span>
          ))}
        </div>
      )}

      <footer>
        <span>
          {publicacion.comments.length} comentarios
        </span>

        <Link to={`/post/${publicacion.id}`}>
          Ver más
        </Link>
      </footer>
    </article>
  );
}

export default PostCard;
