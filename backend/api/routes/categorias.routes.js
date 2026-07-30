import express from "express";
import * as categoriasControllers from "../controllers/categorias.controllers.js";

import { validateToken } from "../../middlewares/token.validate.js";
import { validateCategoria } from "../../middlewares/categorias.validate.js";

const route = express.Router();

route.get("/categorias", categoriasControllers.getCategorias);
route.post("/categorias", [validateToken, validateCategoria], categoriasControllers.createCategoria);
route.put("/categorias/:id", [validateToken, validateCategoria], categoriasControllers.editCategoriaById);
route.delete("/categorias/:id", [validateToken], categoriasControllers.deleteCategoriaById);

export default route;
