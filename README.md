# DWN4AV - Final - Aplicaciones Híbridas

Para el finall seguií con la misma idea con la que venía del parcial anterior, que es la de hacer un gestor de tu backlog de mangas. Básicamente la idea es que puedas cargar qué mangas tenés o queres leer y puedas guardarlos con links para leer online y al mismo tiempo marcar el estado de lectura de cada uno en la vista de detalle.

### Funcionalidades Principales

- **Gestión de Usuarios:** Alta, registro y validación implementada tanto en el frontend como en el backend.
- **Sistema de Roles:** Manejo de permisos medainte asignacion de roles, para separar usuarios comunes de administradores, restringiendo el acceso a los ABMs.
- **ABMs Completos:** Gestión de mangas y autores desde el frontend. (El ABM de categorías, géneros y tipos está 100% funcional a nivel de la API/backend por ahora).
- **Alertas en Tiempo Real:** Uso de WebSockets (Socket.io) para notificar instantáneamente a todos los usuarios conectados cuando hay actualizaciones en la plataforma.
- **Progressive Web App (PWA):** La SPA está configurada para ser instalable en dispositivos móviles y computadoras de escritorio.

## Lo que instalé

### Backend

- **Node.js** y **Express.js**
- **MongoDB**
- **Yup**
- **JWT (JSON Web Tokens)** y **Bcrypt**
- **Multer** y **Sharp**
- **Socket.io**
- **Swagger UI Express** y **Swagger Autogen**
- **CORS** y **Dotenv**

### Frontend

- **React.js**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **React Hook Form**
- **Fetch API**
- **Socket.io Client**
- **React Toastify**
- **JWT Decode**
- **Vite PWA Plugin**

## Cómo correrlo

Para correr este proyecto usá pnpm, como vimos en clase. Está dividido en dos carpetas principales: backend y frontend. Se tienen que levantar ambos servidores en terminales separadas.

### Levantar el Backend (API)

1. Abrí una terminal y parate en la carpeta `backend`.
2. Instalá las cosas necesarias con `pnpm install`.
3. Una vez que terminó, levantás el servidor de desarrollo con `pnpm run dev` y, si todo sale bien, el back queda corriendo en http://localhost:3333.

### Levantar el Frontend (React)

1. Abrí una terminal y parate en la carpeta `frontend`.
2. Instalá las cosas necesarias con `pnpm install`.
3. Una vez que terminó, levantás el servidor de desarrollo con `pnpm run dev` y, si todo sale bien, el front queda corriendo en http://localhost:5173.

## Uso del Sistema

Para acceder a la página tenés que iniciar sesión. Si no tenés una cuenta, podés crear una en la página de registro.

Toda la comunicación entre el front y el back en rutas protegidas está asegurada mediante JWT, que se envía en las cabeceras HTTP.
