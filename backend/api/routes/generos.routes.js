import express from "express";
import * as generosControllers from "../controllers/generos.controllers.js";
import { validateToken } from "../../middlewares/token.validate.js";
import { validateGenero } from "../../middlewares/generos.validate.js";

const route = express.Router();

route.get("/generos", generosControllers.getGeneros);
route.post("/generos", [validateToken, validateGenero], generosControllers.createGenero);
route.put("/generos/:id", [validateToken, validateGenero], generosControllers.editGeneroById);
route.delete("/generos/:id", [validateToken], generosControllers.deleteGeneroById);

export default route;
