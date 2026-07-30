import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import socket from '../../services/socket.service'
import { useMangas } from '../../hooks/useManga'
import { useCategorias } from '../../hooks/useCategoria'
import MangaCard from '../../components/MangaCard'

const Catalogo = () => {
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState("")
  
  const query = categoria ? `?categoria=${categoria}` : ""
  const { mangas, loading } = useMangas(query)
  const { categorias } = useCategorias()

  
  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Catálogo de mangas</h1>
        <select 
          className="border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700 w-full sm:w-auto"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c._id} value={c.slug}>{c.nombre}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="p-8 text-center text-xl text-gray-500 font-bold">Cargando catálogo...</div>
      ) : mangas.length === 0 ? (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 py-12">
          <p className="text-xl font-semibold mb-2">No se encontraron mangas</p>
          <p className="text-sm">No hay mangas registrados en la categoría seleccionada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mangas.map((manga) => (
            <MangaCard key={manga._id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo
