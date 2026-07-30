import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useManga } from '../../hooks/useManga'
import EstadoLectura from '../../components/EstadoLectura'

const MangaDetalle = () => {
  const { id } = useParams()
  const { manga, loading } = useManga(id)
  const navigate = useNavigate()

  if (loading) {
    return <div className="p-8 text-center text-xl text-gray-500 font-bold">Cargando manga...</div>
  }

  if (!manga || Object.keys(manga).length === 0) {
    return <div className="p-8 text-center text-xl text-red-500 font-bold">Error al encontrar el manga</div>
  }

  const portadaUrl = `${import.meta.env.VITE_API_URL}/portadas/${manga.portada}`;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      
      {/* Botón de retroceso */}
      <div className="mb-6">
        <Link to="/catalogo" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors">
          &larr; Volver al catálogo
        </Link>
      </div>

      {/* Info Principal */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mb-8 border border-gray-100">
        <div className="w-full md:w-[360px] h-[571px] bg-transparent shrink-0 flex">
          {manga.portada ? (
            <img 
              src={portadaUrl} 
              alt={manga.nombre} 
              className="w-full h-full object-contain"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-500">Sin portada</div>
          )}
        </div>
        
        <div className="p-8 md:w-2/3 flex flex-col justify-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{manga.nombre}</h1>
          <p className="text-xl text-gray-600 font-medium mb-6">{manga.autor}</p>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider">Categoría</span> <span className="font-semibold text-gray-900">{manga.categoria}</span></div>
            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider">Género</span> <span className="font-semibold text-gray-900">{manga.genero}</span></div>
            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider">Tipo</span> <span className="font-semibold text-gray-900">{manga.tipo}</span></div>
            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider">Volúmenes</span> <span className="font-semibold text-gray-900">{manga.total_volumenes || "Desconocido"}</span></div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Descripción</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{manga.descripcion}</p>
          </div>
          
          <div className="mt-auto flex flex-col xl:flex-row gap-4 items-start xl:items-center">
             <a href={manga.leer} target="_blank" rel="noreferrer" className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-colors shadow-sm whitespace-nowrap flex items-center justify-center">
               Leer Online
             </a>
             
             {/* Componente interactivo de estado de lectura */}
             <EstadoLectura mangaId={manga._id} estadoActual={manga.estado_lectura} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangaDetalle
