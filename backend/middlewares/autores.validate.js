import { autoresSchema } from "../schemas/autores.js";

export function validateAutor(req, res, next) {
  autoresSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err.errors }));
}
