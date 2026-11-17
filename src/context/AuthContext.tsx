import { useState, type ReactNode } from 'react'
import type { Usuario } from '../services/api'
import type { LoginCredentials } from '../types/auth'
import { login as loginService } from '../services/authService'
import { AuthContext } from './authContextValue'

const SESSION_KEY = 'antisocial-usuario'

function getSavedSession(): Usuario | null {
    const saved = localStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Usuario | null>(getSavedSession)

    const login = async (credentials: LoginCredentials) => {
        const data = await loginService(credentials)
        localStorage.setItem(SESSION_KEY, JSON.stringify(data))
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
