# UnaHur Anti-Social Net
**Trabajo Práctico N°2 de Construcción de Interfaces de Usuario.**

Frontend en React + TypeScript para la red social "UnaHur Anti-Social Net". Permite ver las publicaciones de la comunidad, entrar al detalle de cada una, dejar comentarios, registrarse, iniciar sesión y crear publicaciones propias con imágenes y etiquetas. Cada usuario tiene además su perfil con las publicaciones que hizo.

El inicio de sesión es simulado: se busca el nickName en la API y la contraseña es fija (123456). La sesión se guarda en un contexto global y en localStorage, así que no se pierde al recargar la página.

## Integrantes del grupo:
* Ana Paula Godoy
* Martin Staccia
* Naara Ponce
* Alan Valdez
* Juan Ignacio Schmidt

## Tecnologías Utilizadas

* **React**
* **TypeScript**
* **Vite**
* **React-Bootstrap**
* **Bootstrap Icons**
* **React Router Dom**
* **CSS**

## Funcionalidades

* **Login:** con nickName y contraseña fija. Valida que el usuario exista en la API.
* **Registro:** formulario para crear un usuario nuevo. Si sale bien, inicia sesión automáticamente.
* **Home:** feed de publicaciones con descripción, imágenes, etiquetas, cantidad de comentarios y botón "Ver más".
* **Detalle de publicación (/post/:id):** muestra la publicación completa, sus comentarios y un formulario para comentar.
* **Perfil (ruta protegida):** muestra el nickName y las publicaciones del usuario logueado.
* **Crear publicación:** solo disponible con sesión iniciada. Permite agregar descripción, URLs de imágenes y etiquetas.

## API utilizada

Usamos nuestro propio backend, hecho para la materia Estrategia de Persistencia:

https://github.com/JuanSchmidt/Trabajo-Practico-1-EDP

La API corre en **http://localhost:3000**. El frontend le hace las peticiones a `/api` y Vite las redirige a ese puerto (está configurado en `vite.config.ts`), por eso hay que tener el backend levantado antes de usar la aplicación.

## Instrucciones para instalar y correr el proyecto

### 1. Levantar el backend

1. **Clonar el repositorio del backend:**
    ```
    git clone 
    ```https://github.com/Pawlil/anti-social-backend.git
2. **Dirigirse a la carpeta del repositorio:**
    ```
    cd Trabajo-Practico-1-EDP
    ```
3. **Escribir en consola:**
    ```
    npm i
    npm run dev
    ```
4. **Verificar que diga que la aplicación está en el puerto 3000.** No cerrar esa consola.

### 2. Levantar el frontend

En otra consola:

1. **Clonar el repositorio:**
    ```
    git clone https://github.com/Pawlil/tp2-frontend.git
    ```
2. **Dirigirse a la carpeta del repositorio:**
    ```
    cd tp2-frontend
    ```
3. **Escribir en consola:**
    ```
    npm i
    npm run dev
    ```
4. **Abrir el link de localhost proporcionado en la consola** (http://localhost:5173).

### 3. Probar la aplicación

* Crear un usuario desde la página de registro (o con un POST a `/user` desde Postman).
* Iniciar sesión con ese nickName y la contraseña **123456**.
* Para poder elegir etiquetas al crear una publicación, tienen que existir en el backend. Se pueden cargar con un POST a `/tag` enviando `{ "name": "nombre-de-la-etiqueta" }`.