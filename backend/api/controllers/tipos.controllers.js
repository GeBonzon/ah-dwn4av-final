import * as tiposService from "../../services/tipos.services.js";

/**
 * Trae todos los tipos disponibles en la base de datos
 */
export function getTipos(req, res) {
  return tiposService.getTipos()
    .then(tipos => res.status(200).json(tipos))
    .catch(error => res.status(500).json({ error: "Error al obtener los tipos" }));
}



export function createTipo(req, res) {
  return tiposService.createTipo(req.body)
    .then(nuevoTipo => res.status(201).json(nuevoTipo))
    .catch(error => res.status(500).json({ error: "Error al crear el tipo" }));
}

export function editTipoById(req, res) {
  const id = req.params.id;
  return tiposService.editTipoById(id, req.body)
    .then(tipo => res.status(200).json(tipo))
    .catch(error => res.status(500).json({ error: "Error al editar el tipo" }));
}

export function deleteTipoById(req, res) {
  const id = req.params.id;
  return tiposService.deleteTipoById(id)
    .then(() => res.status(200).json({ message: "Tipo borrado exitosamente" }))
    .catch(error => res.status(500).json({ error: "Error al borrar el tipo" }));
}
