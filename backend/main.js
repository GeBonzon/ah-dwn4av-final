import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mangaRouteApi from "./api/routes/mangas.routes.js";
import categoriasRouteApi from "./api/routes/categorias.routes.js";
import generosRouteApi from "./api/routes/generos.routes.js";
import tiposRouteApi from "./api/routes/tipos.routes.js";
import usuariosRouteApi from "./api/routes/usuarios.routes.js";
import autoresRouteApi from "./api/routes/autores.routes.js";
import swaggerFile from "./swagger.json" with { type: "json" };
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/portadas", express.static("uploads"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/api/", mangaRouteApi);
app.use("/api/", categoriasRouteApi);
app.use("/api/", generosRouteApi);
app.use("/api/", tiposRouteApi);
app.use("/api/", usuariosRouteApi);
app.use("/api/", autoresRouteApi);

const server = createServer(app);

/**
 * Configuración e inicialización del servidor de WebSockets permite la comunicación bidireccional y en tiempo real con el cliente
 */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // El broadcast retransmite el evento a todos los clientes conectados excepto a quien disparó el evento ya que no es necesario

  socket.on("manga-nuevo", () => socket.broadcast.emit("manga-nuevo"));
  socket.on("manga-editado", () => socket.broadcast.emit("manga-editado"));
  socket.on("manga-borrado", () => socket.broadcast.emit("manga-borrado"));

  socket.on("autor-nuevo", () => socket.broadcast.emit("autor-nuevo"));
  socket.on("autor-editado", () => socket.broadcast.emit("autor-editado"));
  socket.on("autor-borrado", () => socket.broadcast.emit("autor-borrado"));
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
