import { useMangas } from "../../../hooks/useManga";
import { Link } from "react-router";

const ListadoMangas = () => {
  const { mangas, loading, error } = useMangas();

  if (loading) {
    return <div className="p-8 text-center text-xl text-gray-500 font-bold">Cargando mangas...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Listado de mangas</h1>
        <Link to="/admin" className="text-blue-600 hover:underline font-semibold">
          &larr; Volver atrás
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="mb-4">
          <Link to="/manga/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
            + Nuevo manga
          </Link>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {mangas.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No se cargó ningún manga todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Género
                  </th>
                  <th className="px-6 py-3 border-b text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mangas.map((manga) => (
                  <tr key={manga._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manga.portada ? (
                        <img 
                          src={`${import.meta.env.VITE_API_URL}/portadas/${manga.portada}`} 
                          alt="portada" 
                          className="h-12 w-10 object-cover rounded shadow-sm"
                        />
                      ) : (
                        <div className="h-12 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {manga.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {manga.autor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{manga.categoria}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {manga.genero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-3">
                      <Link 
                        to={`/manga/modificar/${manga._id}`} 
                        className="text-blue-600 hover:text-blue-900 font-semibold"
                      >
                        Editar
                      </Link>
                      <Link 
                        to={`/manga/borrar/${manga._id}`} 
                        className="text-red-600 hover:text-red-900 font-semibold"
                      >
                        Borrar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoMangas;
