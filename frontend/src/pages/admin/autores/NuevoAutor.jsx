import { useForm } from "react-hook-form";
import { useAutoresService } from "../../../services/autores.service";
import { useNavigate, Link } from "react-router";
import socket from "../../../services/socket.service";
import { toast } from "react-toastify";

const NuevoAutor = () => {
  const { register, handleSubmit } = useForm();
  
  const { createAutor } = useAutoresService();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    createAutor({ nombre: formData.nombre, slug: formData.slug })
      .then(() => {
        socket.emit("autor-nuevo");
        navigate("/admin/autores");
      })
      .catch(err => {
        toast.error("Ocurrió un error al crear el autor.");
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Nuevo Autor</h1>
        <Link to="/admin/autores" className="text-blue-600 hover:underline font-semibold">
          &larr; Volver atrás
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Kentaro Miura"
              {...register("nombre", { required: true })}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Slug</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: kentaro-miura"
              {...register("slug", { required: true })}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition-colors">
              Guardar
            </button>
            <Link to="/admin/autores" className="flex-1 text-center bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300 transition-colors">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoAutor;
