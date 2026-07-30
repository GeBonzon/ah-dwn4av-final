import * as mangaService from "../../services/mangas.services.js";

/**
 * Obtiene todos los mangas de la base de datos.
 * Filtra dinámicamente mediante la URL (req.query).
 * @param {Object} req - Objeto de petición de Express. Puede contener query params.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Retorna un JSON con el array de mangas (Status 200) o un error (Status 500).
 */
export function getMangas(req, res) {
  const filter = req.query;
  return mangaService
    .getMangas(filter)
    .then((mangas) => res.status(200).json(mangas))
    .catch((error) => res.status(500).json({ message: "Error al obtener los mangas" }));
}

/**
 * Trae un único manga mediante su ID generada por mongoDB
 * Se extrae el ID de la URL y si la respuesta es exitosa devuelve el manga con status 200 y si hay un error status 500
 * Si el manga no existe devuelve un mensaje de error con status 404
 */
export function getMangaById(req, res) {
  const id = req.params.id;
  return mangaService
    .getMangasById(id)
    .then((manga) => {
      if (manga) {
        res.status(200).json({ data: manga });
      } else {
        res.status(404).json({ message: "Manga no encontrado" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Error al obtener el manga" }));
}

/**
 * Permite modificar un manga existente buscando por su ID.
 * Se extrae el ID de la URL y se une con los datos modificados del cuerpo de la petición, si la respuesta es exitosa devuelve un mensaje de exito con status 200 y si hay un error status 500
 */
export function editMangaById(req, res) {
  const id = req.params.id;
  // 1. Armamos el objeto con todos los datos de texto que vienen del formulario
  const manga = {
    _id: id,
    ...req.body,
  };

  // Si en la edicion el usuario decidio subir una portada nueva, se la agregamos al objeto. Si no sube nada este campo se ignora
  if (req.file) {
    manga.portada = req.file.filename;
  }
  return mangaService
    .editMangaById(manga)
    .then(() => res.status(200).json({ message: "Manga editado correctamente" }))
    .catch((error) => res.status(500).json({ message: "Error al editar el manga", error: error }));
}

/**
 * Permite hacer un borrado lógico (soft delete) de un manga buscado por su ID.
 * Se extrae el ID de la URL (req.params.id), y si la respuesta es exitosa devuelve un mensaje de exito con status 200 y si hay un error status 500
 */
export function deleteMangaById(req, res) {
  const id = req.params.id;
  return mangaService
    .deleteMangaById(id)
    .then(() => res.status(200).json({ message: "Manga eliminado correctamente" }))
    .catch((error) => res.status(500).json({ message: "Error al eliminar el manga", error: error }));
}

/**
 * Permite agregar un nuevo manga a la base de datos.
 * Se extraen los datos a guardar desde el cuerpo de la petición (req.body), y si la respuesta es exitosa devuelve un mensaje de exito con status 201 y si hay un error status 500
 */
export function createManga(req, res) {
  const manga = req.body;
  if (req.file) {
    manga.portada = req.file.filename;
  }
  return mangaService
    .createManga(manga)
    .then((mangaCreado) => res.status(201).json(mangaCreado))
    .catch((error) => res.status(500).json({ message: "Error al crear el manga", error: error }));
}

/**
 * Permite modificar únicamente el estado de lectura de un manga.
 * Se espera recibir el nuevo 'estado' en el body.
 */
export function updateEstadoLectura(req, res) {
  const id = req.params.id;
  const estado = req.body.estado;

  if (!estado) {
    return res.status(400).json({ message: "El campo 'estado' es requerido" });
  }

  return mangaService
    .updateEstadoLecturaManga(id, estado)
    .then(() => res.status(200).json({ message: "Estado de lectura actualizado correctamente" }))
    .catch((error) => res.status(500).json({ message: "Error al actualizar el estado de lectura" }));
}
