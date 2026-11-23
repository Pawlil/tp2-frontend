import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import {
  crearPublicacion,
  obtenerEtiquetas,
  type Etiqueta,
} from "../services/api";
import "./crearPost.css";

interface CrearPostModalProps {
  onPostCreado: () => void;
}

export default function CrearPostModal({ onPostCreado }: CrearPostModalProps) {
  const { user } = useAuth();

  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState<Etiqueta[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<(number | string)[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      obtenerEtiquetas()
        .then((data) => setEtiquetasDisponibles(data))
        .catch(() => setError("No se pudieron cargar las etiquetas"));
    }
  }, [show]);

  const handleCerrar = () => {
    setShow(false);
    setDescription("");
    setUrlInput("");
    setImagenes([]);
    setTagsSeleccionados([]);
    setError(null);
  };

  const handleAgregarImagen = () => {
    const urlLimpia = urlInput.trim();
    if (!urlLimpia) return;
    setImagenes([...imagenes, urlLimpia]);
    setUrlInput("");
  };

  const handleQuitarImagen = (indexAQuitar: number) => {
    setImagenes(imagenes.filter((_, index) => index !== indexAQuitar));
  };

  const handleToggleTag = (tagId: number | string) => {
    if (tagsSeleccionados.includes(tagId)) {
      setTagsSeleccionados(tagsSeleccionados.filter((id) => id !== tagId));
    } else {
      setTagsSeleccionados([...tagsSeleccionados, tagId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }
try {
    setEnviando(true);
    setError(null);
    await crearPublicacion(
      description.trim(),
      user?.id ?? "673a00000000000000000001", // id de prueba por si no hay login
      imagenes,
      tagsSeleccionados
    );
      handleCerrar();
      onPostCreado();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la publicación"
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <button
        type="button"
        id="btn-abrir-crear-post"
        className="home-create-button"
        onClick={() => setShow(true)}
      >
        Haz una publicación
      </button>

      {show && (
        <div
          id="modal-crear-post-overlay"
          className="crear-post-overlay"
          onClick={handleCerrar}
        >
          <div
            id="modal-crear-post"
            className="crear-post-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="crear-post-header">
              <h2>Crear nueva publicación</h2>
              <button
                type="button"
                className="crear-post-close"
                onClick={handleCerrar}
                aria-label="Cerrar"
              >
                ×
              </button>
            </header>

            <form className="crear-post-form" onSubmit={handleSubmit}>
              <div className="crear-post-body">
                {error && <div className="crear-post-error">{error}</div>}

                <div className="crear-post-group">
                  <label htmlFor="post-description">
                    ¿Qué estás pensando, {user?.nickName ?? "invitado"}?
                  </label>
                  <textarea
                    id="post-description"
                    className="crear-post-textarea"
                    rows={3}
                    maxLength={300}
                    placeholder="Escribí tu publicación..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <span className="crear-post-counter">
                    {description.length}/300 caracteres
                  </span>
                </div>

                <div className="crear-post-group">
                  <label htmlFor="post-image-url">Imágenes (URL opcional)</label>
                  <div className="crear-post-image-row">
                    <input
                      id="post-image-url"
                      type="url"
                      className="crear-post-input"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-secundario"
                      onClick={handleAgregarImagen}
                    >
                      Agregar
                    </button>
                  </div>

                  {imagenes.length > 0 && (
                    <ul className="crear-post-image-list">
                      {imagenes.map((img, idx) => (
                        <li key={idx} className="crear-post-image-item">
                          <span className="crear-post-image-url">{img}</span>
                          <button
                            type="button"
                            className="btn-quitar-imagen"
                            onClick={() => handleQuitarImagen(idx)}
                          >
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="crear-post-group">
                  <label>Etiquetas</label>
                  <div className="crear-post-tags">
                    {etiquetasDisponibles.map((tag) => {
                      const seleccionada = tagsSeleccionados.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          className={`crear-post-tag ${
                            seleccionada ? "seleccionada" : ""
                          }`}
                          onClick={() => handleToggleTag(tag.id)}
                        >
                          #{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <footer className="crear-post-footer">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={handleCerrar}
                  disabled={enviando}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primario"
                  disabled={enviando}
                >
                  {enviando ? "Publicando..." : "Publicar"}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </>
  );
}