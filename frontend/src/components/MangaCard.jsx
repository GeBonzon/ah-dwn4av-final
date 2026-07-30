import { Link } from 'react-router'

const MangaCard = ({ manga }) => {
  const portadaUrl = `${import.meta.env.VITE_API_URL}/portadas/${manga.portada}`;

  return (
    <div className="border rounded shadow-sm bg-white overflow-hidden flex flex-col h-full">
      {manga.portada && (
        <img 
          src={portadaUrl} 
          alt={`Portada de ${manga.nombre}`} 
          className="aspect-360/571"
        />
      )}
      
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-bold">{manga.nombre}</h2>
        <p className="text-gray-600 font-semibold">{manga.autor}</p>
        
        <div className="mt-2 text-sm text-gray-700">
          <p>Categoría: <span className="font-medium">{manga.categoria}</span></p>
          <p>Género: {manga.genero}</p>
        </div>
        
        <div className="mt-auto pt-4 flex gap-2">
          <a href={manga.leer} target="_blank" rel="noreferrer" className="bg-gray-200 text-gray-800 text-sm px-3 py-2 rounded text-center hover:bg-gray-300 font-semibold transition-colors flex-1">
            Leer
          </a>
          <Link to={`/manga/${manga._id}`} className="bg-gray-800 text-white text-sm px-3 py-2 rounded text-center hover:bg-gray-900 font-semibold transition-colors flex-1">
            Ver detalles
          </Link>
        </div>

      </div>
    </div>
  )
}

export default MangaCard
