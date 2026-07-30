import { useApi } from "./api.service";

/**
 * Servicio encargado de la comunicación con la API para la entidad mangas
 */
export const useMangasService = () => {
  const { call } = useApi();

  const getMangas = (query = "") => call("/mangas" + query, "GET");
  
  const getMangaById = (id) => call("/mangas/" + id, "GET");
  
  const createManga = (mangaData) => call("/mangas", "POST", mangaData);

  const updateManga = (id, mangaData) => call("/mangas/" + id, "PUT", mangaData);

  const deleteManga = (id) => call("/mangas/" + id, "DELETE");

  const updateEstadoLectura = (id, nuevoEstado) => 
    call("/mangas/" + id + "/estado", "PATCH", { estado: nuevoEstado });

  return { getMangas, getMangaById, createManga, updateManga, deleteManga, updateEstadoLectura };
};
