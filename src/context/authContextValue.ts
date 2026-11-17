import { createContext } from 'react'
import type { Usuario } from '../services/api'
import type { LoginCredentials } from '../types/auth'

export type AuthContextType = {
    user: Usuario | null
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
