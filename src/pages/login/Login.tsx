import { useState, type SubmitEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import type { LoginCredentials } from '../../types/auth'
import { useAuth } from '../../context/useAuth'
import './Login.css'

const initialCredentials: LoginCredentials = {
    nickName: '',
    password: '',
}

function Login() {
    const navigate = useNavigate()
    const { user, login } = useAuth()

    const [credentials, setCredentials] = useState<LoginCredentials>(initialCredentials)
    const [showPassword, setShowPassword] = useState(false)
    const [formValidated, setFormValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (user) return <Navigate to="/home" replace />

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.stopPropagation()
            setFormValidated(true)
            return
        }

        setError(null)
        setSubmitting(true)

        try {
            await login(credentials)
            navigate('/home', { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.')
            setSubmitting(false)
        }
    }

    return (
        <div className="login-page">
            <section className="login-panel">
                <div className="login-brand">
                    <div className="login-logo">U</div>
                    <span className="login-brand-name">UnaHur Anti-Social Net</span>
                </div>

                <div className="login-content">
                    <h1 className="login-title">Bienvenido</h1>

                    {error && <Alert variant="danger" className="login-alert">{error}</Alert>}

                    <Form noValidate validated={formValidated} onSubmit={handleSubmit} className="login-form">
                        <Form.Group className="mb-3" controlId="loginNickName">
                            <Form.Label className="login-label">NickName</Form.Label>
                            <div className="login-input">
                                <i className="bi bi-person login-input-icon" aria-hidden="true"></i>
                                <Form.Control
                                    type="text"
                                    placeholder="Tu nickName"
                                    value={credentials.nickName}
                                    onChange={(event) => setCredentials({ ...credentials, nickName: event.target.value })}
                                    autoComplete="username"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresá tu nickName.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="loginPassword">
                            <Form.Label className="login-label">Contraseña</Form.Label>
                            <div className="login-input">
                                <i className="bi bi-lock login-input-icon" aria-hidden="true"></i>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                                <Form.Control.Feedback type="invalid">
                                    Ingresá tu contraseña.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <button type="submit" className="login-submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Ingresando...
                                </>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </Form>
                    <p className="login-register">
                        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                    </p>
                </div>

                <p className="login-footer">© {new Date().getFullYear()} UnaHur Anti-Social Net</p>
            </section>
        </div>
    )
}

export default Login
