import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function Profile() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <main>
            <h1>{user?.nickName}</h1>
            <button type="button" onClick={handleLogout}>Cerrar sesión</button>
        </main>
    )
}

export default Profile
