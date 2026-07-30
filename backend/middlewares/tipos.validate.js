import { tiposSchema } from "../schemas/tipos.js";

export function validateTipo(req, res, next) {
  tiposSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err.errors }));
}
