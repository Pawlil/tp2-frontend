import { API_URL, type Usuario } from './api'
import type { LoginCredentials } from '../types/auth'

const PASSWORD_FIJA = '123456'

export async function login(credentials: LoginCredentials): Promise<Usuario> {
    let response: Response

    try {
        response = await fetch(`${API_URL}/user`)
    } catch {
        throw new Error('No se pudo conectar con el servidor')
    }

    if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor')
    }

    const usuarios: Usuario[] = await response.json()
    const nickName = credentials.nickName.trim()
    const usuario = usuarios.find((u) => u.nickName === nickName)

    if (!usuario || credentials.password !== PASSWORD_FIJA) {
        throw new Error('Usuario o contraseña incorrectos')
    }

    return usuario
}
