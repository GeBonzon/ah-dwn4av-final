import { io } from "socket.io-client";

// Inicializamos la conexión con el backend (puerto 3333)
const socket = io(import.meta.env.VITE_API_URL);

export default socket;
