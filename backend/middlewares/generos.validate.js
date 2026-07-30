import { generosSchema } from "../schemas/generos.js";

export function validateGenero(req, res, next) {
  generosSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err.errors }));
}
