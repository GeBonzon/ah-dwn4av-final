import { useState } from 'react'
import { useMangasService } from '../services/mangas.service'
import { toast } from 'react-toastify'
/**
 * Componente que permite cambiar el estado de lectura de un manga dentro de al vista de detalle
 */
const EstadoLectura = ({ mangaId, estadoActual }) => {
  const [estado, setEstado] = useState(estadoActual || "No empezado")
  const { updateEstadoLectura } = useMangasService()

  const handleSave = () => {
    updateEstadoLectura(mangaId, estado)
    .then(data => {
      toast.success("¡Estado de lectura actualizado!");
    })
    .catch(err => {
      console.error(err)
      toast.error("Error al guardar el estado.");
    })
  }

  // Clases dinámicas para que el select cambie de color según el estado
  const getBadgeClass = () => {
    if (estado === "Quiero leer") return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (estado === "Leyendo") return "bg-blue-100 text-blue-800 border-blue-200"
    if (estado === "Terminado") return "bg-emerald-100 text-emerald-800 border-emerald-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="bg-white border border-gray-200 px-5 py-3 rounded-lg flex items-center gap-3 shadow-sm">
      <span className="font-semibold text-gray-600">Estado de lectura:</span> 
      
      <select 
        value={estado} 
        onChange={(e) => setEstado(e.target.value)}
        className={`px-3 py-1 rounded text-sm font-black tracking-wide uppercase border outline-none cursor-pointer ${getBadgeClass()}`}
      >
        <option value="No empezado">No empezado</option>
        <option value="Quiero leer">Quiero leer</option>
        <option value="Leyendo">Leyendo</option>
        <option value="Terminado">Terminado</option>
      </select>

      <button 
        onClick={handleSave}
        className="ml-2 bg-gray-800 hover:bg-gray-900 text-white text-xs px-3 py-1.5 rounded font-bold transition-colors"
      >
        Guardar
      </button>
    </div>
  )
}

export default EstadoLectura
