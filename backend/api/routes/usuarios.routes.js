import { Router } from "express";
import * as controllers from "../controllers/usuarios.controllers.js";
import { validateLogin, validateRegister } from "../../middlewares/usuarios.validate.js";
import { validateToken, validateRolSuperAdmin } from "../../middlewares/token.validate.js";

const route = Router();

route.post("/usuarios", [validateRegister], controllers.createUser);
route.post("/usuarios/login", [validateLogin], controllers.login);
route.get("/usuarios", [validateToken, validateRolSuperAdmin], controllers.getUsuarios);
route.patch("/usuarios/:idUsuario/rol", [validateToken, validateRolSuperAdmin], controllers.asignarRol);

export default route;
