import { categoriasSchema } from "../schemas/categorias.js";

export function validateCategoria(req, res, next) {
  categoriasSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err.errors }));
}
