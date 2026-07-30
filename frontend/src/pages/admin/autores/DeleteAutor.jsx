import { useAutoresService } from "../../../services/autores.service";
import { useNavigate, useParams, Link } from "react-router";
import { useAutor } from "../../../hooks/useAutor";
import socket from "../../../services/socket.service";
import { toast } from "react-toastify";

const DeleteAutor = () => {
  const { id } = useParams();
  const { autor, loading } = useAutor(id);
  
  const { deleteAutor } = useAutoresService();
  const navigate = useNavigate();

  const handleBorrar = (e) => {
    e.preventDefault();
    deleteAutor(id)
      .then(() => {
        socket.emit("autor-borrado");
        navigate("/admin/autores");
      })
      .catch(err => {
        toast.error("Ocurrió un error al eliminar el autor.");
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administración de autores</h1>
        <Link to="/admin/autores" className="text-blue-600 hover:underline font-semibold">
          &larr; Volver al listado de autores
        </Link>
      </div>

      <div className="bg-white p-8 shadow-md border max-w-xl mx-auto mt-20 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Eliminar autor</h2>
        {loading ? (
          <p className="text-center font-bold text-gray-500">Cargando datos...</p>
        ) : (
          <>
            <p className="text-xl text-center mb-8">
              ¿Estás seguro de que querés borrar al autor <b>{autor?.nombre}</b>?
            </p>
            <form onSubmit={handleBorrar} className="flex justify-center gap-4">
              <button type="submit" className="bg-red-600 text-white px-6 py-2 font-bold hover:bg-red-700 transition-colors">
                Confirmar
              </button>
              <Link to="/admin/autores" className="bg-gray-200 text-gray-800 px-6 py-2 font-bold hover:bg-gray-300 transition-colors">
                Cancelar
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAutor;
