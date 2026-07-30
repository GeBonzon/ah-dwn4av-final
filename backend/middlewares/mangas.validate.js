import { mangasSchema } from "../schemas/mangas.js";

export function validateManga(req, res, next) {
  mangasSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err.errors }));
}
