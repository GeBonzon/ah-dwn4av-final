import { Link, useNavigate, useParams } from "react-router"
import { useMangasService } from "../../../services/mangas.service"
import { useManga } from "../../../hooks/useManga"
import { toast } from "react-toastify"
import socket from "../../../services/socket.service"

const DeleteManga = () => {
    const { id } = useParams()
    const { manga, loading } = useManga(id)
    const { deleteManga } = useMangasService()

    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteManga(id)
            .then(() => {
                socket.emit("manga-borrado");
                navigate("/admin/mangas")
            })
            .catch((err) => {
                toast.error("Ocurrió un error al eliminar el manga.");
            })
    }

    return (
        <div className="p-8 max-w-4xl mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-20">Administración de mangas</h1>
                <Link to="/admin/mangas" className="text-blue-600 hover:underline font-semibold">
                    &larr; Volver al listado de mangas
                </Link>
            </div>

            <div className="bg-white p-8 shadow-md border max-w-xl mx-auto mt-20 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Eliminar manga</h2>
                {loading ? (
                    <p className="text-center font-bold text-gray-500">Cargando datos...</p>
                ) : (
                    <>
                        <p className="text-xl text-center mb-8">
                            ¿Estás seguro de que querés borrar el manga <b>{manga?.nombre}</b>?
                        </p>
                        <form onSubmit={handleSubmit} className="flex justify-center gap-4">
                            <button type="submit" className="bg-red-600 text-white px-6 py-2 font-bold hover:bg-red-700 transition-colors">
                                Confirmar
                            </button>
                            <Link to="/admin/mangas" className="bg-gray-200 text-gray-800 px-6 py-2 font-bold hover:bg-gray-300 transition-colors">
                                Cancelar
                            </Link>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default DeleteManga
