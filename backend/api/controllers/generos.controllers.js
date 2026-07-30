import * as generosService from "../../services/generos.services.js";
/**
 * Trae todos los generos disponibles en la base de datos
 */
export function getGeneros(req, res) {
  return generosService
    .getGeneros()
    .then((generos) => res.status(200).json(generos))
    .catch((error) => res.status(500).json({ error: "Error al obtener los generos" }));
}

export function createGenero(req, res) {
  return generosService
    .createGenero(req.body)
    .then((nuevoGenero) => res.status(201).json(nuevoGenero))
    .catch((error) => res.status(500).json({ error: "Error al crear el genero" }));
}

export function editGeneroById(req, res) {
  const id = req.params.id;
  return generosService
    .editGeneroById(id, req.body)
    .then((genero) => res.status(200).json(genero))
    .catch((error) => res.status(500).json({ error: "Error al editar el genero" }));
}

export function deleteGeneroById(req, res) {
  const id = req.params.id;
  return generosService
    .deleteGeneroById(id)
    .then(() => res.status(200).json({ message: "Genero borrado exitosamente" }))
    .catch((error) => res.status(500).json({ error: "Error al borrar el genero" }));
}
