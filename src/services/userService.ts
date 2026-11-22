const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse {
    message?: string;
    errores?: string[];
}

export const createUser = async (nickName: string): Promise<void> => {

    const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nickName,
        }),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok) {
        const errorMessage =
            data.errores?.[0] ||
            data.message ||
            "No se pudo crear el usuario";

        throw new Error(errorMessage);
    }
};