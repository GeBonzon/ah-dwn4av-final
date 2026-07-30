import { Router } from "express";
import * as mangaController from "../controllers/mangas.controllers.js";
import { validateManga } from "../../middlewares/mangas.validate.js";
import { validateToken, validateRolAdmin } from "../../middlewares/token.validate.js";

import upload, { resizeImage } from "../../middlewares/imagenes.upload.js";

const router = Router();

router.get("/mangas", [validateToken], mangaController.getMangas);
router.get("/mangas/:id", [validateToken], mangaController.getMangaById);
router.post("/mangas", [upload.single("portada"), resizeImage, validateToken, validateRolAdmin, validateManga], mangaController.createManga);
router.put("/mangas/:id", [upload.single("portada"), resizeImage, validateToken, validateRolAdmin, validateManga], mangaController.editMangaById);
router.patch("/mangas/:id/estado", [validateToken], mangaController.updateEstadoLectura);
router.delete("/mangas/:id", [validateToken, validateRolAdmin], mangaController.deleteMangaById);

export default router;
