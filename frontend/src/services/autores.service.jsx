import { useApi } from "./api.service";

export function useAutoresService() {
  const { call } = useApi();
    
  const getAutores = () => {
    return call("/autores", "GET");
  };

  const createAutor = (autor) => {
    return call("/autores", "POST", autor);
  };

  const editAutor = (id, autor) => {
    return call("/autores/" + id, "PUT", autor);
  };

  const deleteAutor = (id) => {
    return call("/autores/" + id, "DELETE");
  };

  return {
    getAutores,
    createAutor,
    editAutor,
    deleteAutor,
  };
}
