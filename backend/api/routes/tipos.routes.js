import express from "express";
import * as tiposControllers from "../controllers/tipos.controllers.js";

import { validateToken } from "../../middlewares/token.validate.js";
import { validateTipo } from "../../middlewares/tipos.validate.js";

const route = express.Router();

route.get("/tipos", tiposControllers.getTipos);

route.post("/tipos", [validateToken, validateTipo], tiposControllers.createTipo);
route.put("/tipos/:id", [validateToken, validateTipo], tiposControllers.editTipoById);
route.delete("/tipos/:id", [validateToken], tiposControllers.deleteTipoById);

export default route;
