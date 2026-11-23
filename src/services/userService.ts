import { API_URL } from "./api";

interface ApiResponse {
    message?: string;
    errores?: string[];
}

export const createUser = async (nickName: string): Promise<void> => {

    let response: Response;

    try {
        response = await fetch(`${API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickName,
            }),
        });
    } catch {
        throw new Error("No se pudo conectar con el servidor");
    }

    const data: ApiResponse = await response.json();

    if (!response.ok) {
        const errorMessage =
            data.errores?.[0] ||
            data.message ||
            "No se pudo crear el usuario";

        throw new Error(errorMessage);
    }
};