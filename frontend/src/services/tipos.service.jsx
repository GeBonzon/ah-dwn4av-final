import { useApi } from "./api.service";
/**
 * Servicio encargado de la comunicacion con la API para la entidad tipos
 */
export function useTiposService() {
  const { call } = useApi();

  const getTipos = () => {
    return call("/tipos", "GET");
  };

  const createTipo = (tipo) => {
    return call("/tipos", "POST", tipo);
  };

  const editTipo = (id, tipo) => {
    return call("/tipos/" + id, "PUT", tipo);
  };

  const deleteTipo = (id) => {
    return call("/tipos/" + id, "DELETE");
  };

  return {
    getTipos,
    createTipo,
    editTipo,
    deleteTipo,
  };
}
