

export interface Usuario {
  id: number;
  nickName: string;
}

export interface Imagen {
  id: number;
  url: string;
  postId: number;
}

export interface Etiqueta {
  id: number;
  name: string;
}

export interface Comentario {
  id: number;
  content: string;
  createdAt: string;
  user: Usuario;
}

export interface Publicacion {
  id: number;
  description: string;
  createdAt: string;
  userId: number;
  user: Usuario;
  images: Imagen[];
  tags: Etiqueta[];
  comments: Comentario[];
}


export const API_URL = "http://localhost:3000";

export async function obtenerPublicaciones(): Promise<Publicacion[]> {
  const respuesta = await fetch(`${API_URL}/post`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las publicaciones");
  }

  return await respuesta.json();
  
}

export async function obtenerPublicacion(id: string): Promise<Publicacion> {
  const respuesta = await fetch(`${API_URL}/post/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la publicación");
  }

  return await respuesta.json();
}

export async function crearComentario(
  content: string,
  userId: number,
  postId: number
) {
  const respuesta = await fetch(`${API_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      userId,
      postId,
    }),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el comentario");
  }

  return await respuesta.json();
}