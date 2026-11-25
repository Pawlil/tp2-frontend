import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { obtenerPublicacionesPorUsuario, type Publicacion } from '../../services/api'
import PostCard from '../../components/PostCard'
import './Profile.css'

function Profile() {
    const { user } = useAuth()
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [intento, setIntento] = useState(0)

    useEffect(() => {
        let activo = true

        async function cargarPublicaciones() {
            if (!user) return

            setCargando(true)
            setError('')

            try {
                const datos = await obtenerPublicacionesPorUsuario(user.id)
                if (activo) setPublicaciones(datos)
            } catch (err) {
                if (activo) {
                    setError(err instanceof Error ? err.message : 'No se pudieron cargar tus publicaciones.')
                }
            } finally {
                if (activo) setCargando(false)
            }
        }

        cargarPublicaciones()

        return () => {
            activo = false
        }
    }, [user, intento])

    return (
        <main className="profile-container">
            <header className="profile-header">
                <div>
                    <Link className="profile-home-link" to="/home">← Volver al inicio</Link>
                    <p className="profile-eyebrow">Tu espacio personal</p>
                    <h1>Perfil de {user?.nickName}</h1>
                    <p className="profile-post-count">
                        {publicaciones.length} {publicaciones.length === 1 ? 'publicación' : 'publicaciones'}
                    </p>
                </div>
            </header>

            <section className="profile-posts">
                <h2>Mis publicaciones</h2>

                {cargando && <p className="profile-message">Cargando tus publicaciones...</p>}

                {!cargando && error && (
                    <div className="profile-error" role="alert">
                        <p>{error}</p>
                        <button type="button" onClick={() => setIntento((actual) => actual + 1)}>
                            Volver a intentar
                        </button>
                    </div>
                )}

                {!cargando && !error && publicaciones.length === 0 && (
                    <div className="profile-empty">
                        <h3>Todavía no publicaste nada</h3>
                        <p>Cuando crees una publicación, aparecerá acá.</p>
                        <Link to="/home">Explorar publicaciones</Link>
                    </div>
                )}

                {!cargando && !error && publicaciones.length > 0 && (
                    <div className="profile-post-list">
                        {publicaciones.map((publicacion) => (
                            <PostCard key={publicacion.id} publicacion={publicacion} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Profile
