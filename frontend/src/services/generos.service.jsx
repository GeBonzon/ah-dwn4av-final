import { useApi } from "./api.service";
/**
 * Servicio encargado de la comunicacion con la API para la entidad generos
 */
export function useGenerosService() {
  const { call } = useApi();
    
  const getGeneros = () => {
    return call("/generos", "GET");
  };

  const createGenero = (genero) => {
    return call("/generos", "POST", genero);
  };

  const editGenero = (id, genero) => {
    return call("/generos/" + id, "PUT", genero);
  };

  const deleteGenero = (id) => {
    return call("/generos/" + id, "DELETE");
  };

  return {
    getGeneros,
    createGenero,
    editGenero,
    deleteGenero,
  };
}