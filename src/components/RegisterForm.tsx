
import { useState, type ChangeEvent, type FormEvent } from "react";
import { validateForm } from "../validators/registerFormValidator";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { FormData, FormErrors } from "../types/registerFormTypes";
import Alert from "react-bootstrap/Alert";
import "./RegisterForm.css";

const PASSWORD_FIJA = "123456";

export const RegisterForm = () => {

    const [formData, setFormData] = useState<FormData>({
        user: "",
        birthday: "",
        gender: "",
        email: "",
        phone: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });

        setError(null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const newErrors: FormErrors = validateForm(formData);

        setErrors(newErrors);
        setError(null);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setSubmitting(true);

        let accountCreated = false;

        try {

            const nickName = formData.user.trim();

            // Crear el usuario en el Backend
            await createUser(nickName);

            accountCreated = true;

            // Iniciar sesión automáticamente
            await login({
                nickName,
                password: PASSWORD_FIJA,
            });

            // Redirigir a Home con el usuario autenticado
            navigate("/home", {
                replace: true,
                state: {
                    accountCreated: true,
                },
            });

        } catch (err) {

            if (accountCreated) {
                setError(
                    "Tu cuenta fue creada correctamente, pero no se pudo iniciar sesión automáticamente. Podés ingresar desde Login con la contraseña 123456."
                );
            } else {
                setError(
                    err instanceof Error
                        ? err.message
                        : "No se pudo crear el usuario."
                );
            }

        } finally {

            setSubmitting(false);

        }
    };

    return (
        <div className="form-container">

            <form onSubmit={handleSubmit} noValidate>

                {/* USUARIO */}
                <div className="mb-4 user">
                    <label htmlFor="user" className="form-label">
                        Nombre de usuario <span className="obligatorio">*</span>
                    </label>

                    <input
                        type="text"
                        id="user"
                        name="user"
                        placeholder="Escribe tu nombre de usuario"
                        className={`form-control input-short ${errors.user ? "is-invalid" : ""}`}
                        value={formData.user}
                        onChange={handleChange}
                        aria-invalid={!!errors.user}
                    />

                    {errors.user && (
                        <div className="invalid-feedback d-block">
                            {errors.user}
                        </div>
                    )}
                </div>

                {/* FECHA DE NACIMIENTO */}
                <div className="mb-4 birthday">
                    <label htmlFor="birthday" className="form-label">
                        Fecha de nacimiento
                    </label>

                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        className="form-control input-short"
                        value={formData.birthday}
                        onChange={handleChange}
                    />
                </div>

                {/* GENERO */}
                <div className="mb-4 gender">
                    <label htmlFor="gender" className="form-label">
                        Género
                    </label>

                    <select
                        id="gender"
                        name="gender"
                        className="form-control input-short"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona tu género</option>
                        <option value="Masculino">Masculino / Hombre</option>
                        <option value="Femenino">Femenino / Mujer</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>

                {/* EMAIL */}
                <div className="mb-4 email">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Escribe tu email"
                        className="form-control input-short"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* TELEFONO */}
                <div className="mb-4 phone">
                    <label htmlFor="phone" className="form-label">
                        Número de teléfono
                    </label>

                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Escribe tu teléfono"
                        className="form-control input-short"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* PRIVACIDAD */}
                <div className="privacy-note">
                    <p>
                        Al enviar mis datos, acepto los Términos de uso
                        de UnaHur Anti-Social Net, y he leído y reconozco la Política de
                        privacidad del mismo.
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <Alert variant="danger" role="alert">
                        {error}
                    </Alert>
                )}

                {/* BOTON DE ENVIAR */}
                <button
                    type="submit"
                    className="btn btn-primary form-button"
                    disabled={submitting}
                >
                    {submitting ? "Registrando..." : "Enviar"}
                </button>

            </form>

            {/* CAMPOS OBLIGATORIOS */}
            <p className="required-note">
                <span className="obligatorio">*</span>
                Los campos obligatorios deben completarse.
            </p>

        </div>
    );
};

