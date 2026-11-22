import type { FormData, FormErrors } from "../types/registerFormTypes";

export const validateForm = (data: FormData): FormErrors => {

    const newErrors: FormErrors = {};

    const user = data.user.trim();

    if (user === "") {
        newErrors.user = "El apodo es obligatorio";
    } else if (user.length < 3) {
        newErrors.user = "El apodo debe tener al menos 3 caracteres";
    } else if (user.length > 100) {
        newErrors.user = "El apodo no puede superar los 100 caracteres";
    }

    return newErrors;
};
//Las validaciones coinciden con las del backend.