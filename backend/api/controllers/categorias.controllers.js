import * as categoriasService from "../../services/categorias.services.js";
/**
 * Trae todas las categorias disponibles en la base de datos
 */
export function getCategorias(req, res) {
  return categoriasService
    .getCategorias()
    .then((categorias) => res.status(200).json(categorias))
    .catch((error) => res.status(500).json({ error: "Error al obtener las categorias" }));
}

export function createCategoria(req, res) {
  return categoriasService
    .createCategoria(req.body)
    .then((nuevaCategoria) => res.status(201).json(nuevaCategoria))
    .catch((error) => res.status(500).json({ error: "Error al crear la categoria" }));
}

export function editCategoriaById(req, res) {
  const id = req.params.id;
  return categoriasService
    .editCategoriaById(id, req.body)
    .then((categoria) => res.status(200).json(categoria))
    .catch((error) => res.status(500).json({ error: "Error al editar la categoria" }));
}

export function deleteCategoriaById(req, res) {
  const id = req.params.id;
  return categoriasService
    .deleteCategoriaById(id)
    .then(() => res.status(200).json({ message: "Categoria borrada exitosamente" }))
    .catch((error) => res.status(500).json({ error: "Error al borrar la categoria" }));
}
