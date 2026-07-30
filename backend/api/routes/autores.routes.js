import express from "express";
import * as autoresControllers from "../controllers/autores.controllers.js";
import { validateToken, validateRolAdmin } from "../../middlewares/token.validate.js";
import { validateAutor } from "../../middlewares/autores.validate.js";

const route = express.Router();

route.get("/autores", autoresControllers.getAutores);
route.post("/autores", [validateToken, validateRolAdmin, validateAutor], autoresControllers.createAutor);
route.put("/autores/:id", [validateToken, validateRolAdmin, validateAutor], autoresControllers.editAutorById);
route.delete("/autores/:id", [validateToken, validateRolAdmin], autoresControllers.deleteAutorById);

export default route;
