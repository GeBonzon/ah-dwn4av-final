import { useApi } from "./api.service";
/**
 * Servicio encargado de la comunicacion con la API para la entidad categorias
 */
export function useCategoriasService() {
  const { call } = useApi();

  const getCategorias = () => {
    return call("/categorias", "GET");
  };

  const createCategoria = (categoria) => {
    return call("/categorias", "POST", categoria);
  };

  const editCategoria = (id, categoria) => {
    return call("/categorias/" + id, "PUT", categoria);
  };

  const deleteCategoria = (id) => {
    return call("/categorias/" + id, "DELETE");
  };

  return {
    getCategorias,
    createCategoria,
    editCategoria,
    deleteCategoria,
  };
}
