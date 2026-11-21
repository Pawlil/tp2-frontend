import { useState, type ChangeEvent, type FormEvent } from "react";
import { validateForm } from '../validators/registerFormValidator.ts';
import { createUser } from "../services/userService.ts";
import { useNavigate } from "react-router-dom";
import type { FormData, FormErrors } from "../types/registerFormTypes.ts";
import "./RegisterForm.css";

export const RegisterForm = () => {

    const [formData, setFormData] = useState<FormData>({
        user: "",
        birthday: "",
        gender: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({});

    const [loading, setLoading] = useState(false);

    const [serverError, setServerError] = useState("");

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

        setServerError("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const newErrors: FormErrors = validateForm(formData);

        setErrors(newErrors);
        setServerError("");

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {

            setLoading(true);

            await createUser(formData.user.trim());

            navigate("/home", {
                state: {
                    accountCreated: true
                }
            });

        } catch (error) {

            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("No se pudo crear el usuario");
            }

        } finally {

            setLoading(false);

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
                        className={`form-control input-short ${errors.user ? 'is-invalid' : ''}`}
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

                {/* CONTRASEÑA */}
                <div className="mb-4 password">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Escribe tu contraseña"
                        className="form-control input-short"
                        value={formData.password}
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

                {/* ERROR DEL SERVIDOR */}
                {serverError && (
                    <div className="server-error-message" role="alert">
                        <span className="server-error-icon">!</span>

                        <span>{serverError}</span>
                    </div>
                )}

                {/* BOTON DE ENVIAR */}
                <button
                    type="submit"
                    className="btn btn-primary form-button"
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Enviar"}
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
