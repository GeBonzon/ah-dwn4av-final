import * as autoresService from "../../services/autores.services.js";

export function getAutores(req, res) {
  return autoresService.getAutores()
    .then(autores => res.status(200).json(autores))
    .catch(error => res.status(500).json({ error: "Error al obtener los autores" }));
}

export function createAutor(req, res) {
  return autoresService.createAutor(req.body)
    .then(nuevoAutor => res.status(201).json(nuevoAutor))
    .catch(error => res.status(500).json({ error: "Error al crear el autor" }));
}

export function editAutorById(req, res) {
  const id = req.params.id;
  return autoresService.editAutorById(id, req.body)
    .then(autor => res.status(200).json(autor))
    .catch(error => res.status(500).json({ error: "Error al editar el autor" }));
}

export function deleteAutorById(req, res) {
  const id = req.params.id;
  return autoresService.deleteAutorById(id)
    .then(() => res.status(200).json({ message: "Autor borrado exitosamente" }))
    .catch(error => res.status(500).json({ error: "Error al borrar el autor" }));
}
