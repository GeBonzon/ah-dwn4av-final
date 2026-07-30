import { useForm } from "react-hook-form";
import { useAutoresService } from "../../../services/autores.service";
import { useAutor } from "../../../hooks/useAutor";
import { useNavigate, useParams, Link } from "react-router";
import socket from "../../../services/socket.service";
import { toast } from "react-toastify";

const ModificarAutor = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  
  const { autor, loading } = useAutor(id);
  const { editAutor } = useAutoresService();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    editAutor(id, { nombre: formData.nombre, slug: formData.slug })
      .then(() => {
        socket.emit("autor-editado");
        navigate("/admin/autores");
      })
      .catch(err => {
        toast.error("Ocurrió un error al modificar el autor.");
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Modificar autor</h1>
        <Link to="/admin/autores" className="text-blue-600 hover:underline font-semibold">
          &larr; Volver atrás
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        
        {loading != true && <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("nombre", { required: true })}
              defaultValue={autor?.nombre}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Slug</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("slug", { required: true })}
              defaultValue={autor?.slug}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition-colors">
              Guardar cambios
            </button>
            <Link to="/admin/autores" className="flex-1 text-center bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300 transition-colors flex items-center justify-center">
              Cancelar
            </Link>
          </div>
        </form>}
      </div>
    </div>
  );
};

export default ModificarAutor;
