import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";
import fs from "fs/promises";

// Estaba teniendo probelma para conectarme a mongodb atlas, tanto en mi codigo como con el de los ejemplso de clase
// al buscar el error que me daba  que era SRV error: Error: querySrv ECONNREFUSED _mongodb._tcp.appshibridas01.nn7qxiv.mongodb.net
// encontre esta solucion en google que me funciono https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
// no enteindo pq funciona  forzando los dns desde aca si son los mismo dns que ya tenia yo configurados ne mi conexion pero sin esto no me dejaba conectarme
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Cadena SRV para mongodb atlas
//Le deje ese nombre a la base de datos pq es como estaba en al consigna y em olvide  de preguntar si habia que actualziarlo a por ej "AH20264CP1"
const client = new MongoClient("mongodb+srv://admin:hibridas2026@appshibridas01.nn7qxiv.mongodb.net/");
const dbMangas = client.db("AH20264CF");

/**
 * Obtiene la lista de mangas aplicando filtros dinámicos y ordenamiento
 *
 * La idea es permitir que la vista principal pueda buscar mangas específicos sin tener que traer toda la base de datos a memoria primero
 * @param {Object} filter - Objeto con los filtros (categoria, autor, etc.)
 * @returns {Promise<Array>} Lista de mangas filtrada y ordenada
 */
export async function getMangas(filter = {}) {
  try {
    await client.connect();
    const filterMongo = { borrado: { $ne: true } };

    if (filter?.categoria) {
      const dbCategoria = await dbMangas.collection("categorias").findOne({ slug: filter.categoria });
      if (dbCategoria) {
        filterMongo.categoria = dbCategoria.nombre;
      }
    }
    //Adaptar los toros filtros a usar slugs tmb
    if (filter?.autor) filterMongo.autor = filter.autor;
    if (filter?.genero) filterMongo.genero = filter.genero;
    if (filter?.tipo) filterMongo.tipo = filter.tipo;

    // Lo del error.message vi en al docuemtnacion que servia para obtener el nombre del error especfico demanera mas limpia lo cual lo use apra debuggear pq no me cargaba los mangas
    //https://nodejs.org/api/errors.html#errormessage
    return dbMangas.collection("mangas").find(filterMongo).toArray();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Obtiene un manga específico buscando por su ID de MongoDB
 *
 * Esta función es clave para la página de "Ver Detalle", donde solo necesitamos la información completa de un solo obejot o manga
 * @param {string} id - El ID autogenerado por MongoDB
 * @returns {Promise<Object>} El objeto del manga encontrado
 */
export async function getMangasById(id) {
  try {
    await client.connect();
    return dbMangas.collection("mangas").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Crea un nuevo manga en la base de datos
 * @param {Object} manga - El objeto JSON con los datos del nuevo manga
 * @returns {Promise<Object>} Resultado de la operación de inserción
 */
export async function createManga(manga) {
  try {
    await client.connect();
    return dbMangas.collection("mangas").insertOne(manga);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Edita un manga existente asegurándose de no sobrescribir el _id
 * @param {Object} manga - El objeto del manga con los campos actualizados
 * @returns {Promise<Object>} Resultado de la actualización
 */
export async function editMangaById(manga) {
  const mangaAnterior = await getMangasById(manga._id);
  try {
    await client.connect();
    const { _id, ...datosManga } = manga;

    await dbMangas.collection("mangas").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: datosManga,
      },
    );
    if (manga?.portada) {
      await fs.unlink("uploads/" + mangaAnterior.portada);
    }
    return manga._id;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Hace un soft delete de un manga
 *
 * En lugar de borrar el dato definitivamente, le agregamos uina flag de borrado:true
 * Esto hace que no aparezca mas en las vistas pero sin perder lsod atos, lo cual ayuda a evitar accidentes
 * @param {string} id - El ID del manga a eliminar
 * @returns {Promise<Object>} Resultado de la actualización
 */
export async function deleteMangaById(id) {
  await client.connect();
  const manga = await getMangasById(id);
  const respuesta = await dbMangas.collection("mangas").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        borrado: true,
      },
    },
  );
  if (manga?.portada) await fs.unlink("uploads/" + manga.portada);
  return respuesta;
}

/**
 * Actualiza únicamente el estado de lectura de un manga
 *
 * Use $set para actualizar solo el campo de estado de lectura mediante el desplegable del formul;ario que esta en al vista de detalle
 * @param {string} id - El ID del manga
 * @param {string} estado - El nuevo estado ('Quiero Leer', 'Leyendo', 'Terminado')
 * @returns {Promise<Object>} Resultado de la actualización
 */
export async function updateEstadoLecturaManga(id, estado) {
  try {
    await client.connect();
    return dbMangas.collection("mangas").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          estado_lectura: estado,
        },
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}
