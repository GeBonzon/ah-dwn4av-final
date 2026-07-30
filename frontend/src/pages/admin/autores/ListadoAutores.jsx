import React, { useEffect } from 'react';
import { useAutores } from "../../../hooks/useAutor";
import { Link } from "react-router";
import { toast } from 'react-toastify';
import socket from '../../../services/socket.service';

const ListadoAutores = () => {
  const { autores, loading, error } = useAutores();

  
  if (loading) {
    return <div className="p-8 text-center text-xl text-gray-500 font-bold">Cargando autores...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Listado de autores</h1>
        <Link to="/admin" className="text-blue-600 hover:underline font-semibold">
          &larr; Volver atrás
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="mb-4">
          <Link to="/admin/autores/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
            + Nuevo autor
          </Link>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {autores.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No se cargaron autores todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 border-b text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {autores.map((autor) => (
                  <tr key={autor._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {autor.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {autor.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-3">
                      <Link 
                        to={`/admin/autores/modificar/${autor._id}`} 
                        className="text-blue-600 hover:text-blue-900 font-semibold"
                      >
                        Editar
                      </Link>
                      <Link 
                        to={`/admin/autores/borrar/${autor._id}`} 
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

export default ListadoAutores;
