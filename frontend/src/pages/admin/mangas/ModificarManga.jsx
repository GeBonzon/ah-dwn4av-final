import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMangasService } from "../../../services/mangas.service"
import { useNavigate, useParams, Link } from "react-router"
import { toast } from "react-toastify"
import socket from "../../../services/socket.service"
import { useManga } from "../../../hooks/useManga"
import { useCategorias } from "../../../hooks/useCategoria"
import { useGeneros } from "../../../hooks/useGenero"
import { useTipos } from "../../../hooks/useTipo"
import { useAutores } from "../../../hooks/useAutor"

const ModificarManga = () => {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors }
    } = useForm()
    
    const navigate = useNavigate()
    const { getMangaById, updateManga } = useMangasService()
    
    const { categorias: listaCategorias } = useCategorias()
    const { generos: listaGeneros } = useGeneros()
    const { tipos: listaTipos } = useTipos()
    const { autores: listaAutores } = useAutores()
    
    const { manga, loading } = useManga(id)

    const onSubmit = (formData) => {
        const data = new FormData()
        data.append("nombre", formData.nombre)
        data.append("autor", formData.autor)
        data.append("descripcion", formData.descripcion)
        data.append("categoria", formData.categoria)
        data.append("genero", formData.genero)
        data.append("tipo", formData.tipo)
        if (formData.total_volumenes) data.append("total_volumenes", parseInt(formData.total_volumenes))
        if (formData.leer) data.append("leer", formData.leer)

        if (formData.portada?.[0]) {
            data.append("portada", formData.portada[0])
        }

        fetch(import.meta.env.VITE_API_URL + "/api/mangas/" + id, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: data
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error("Error en la petición")
            })
            .then(data => {
                socket.emit("manga-editado");
                navigate("/admin/mangas")
            })
            .catch(err => {
                toast.error("Ocurrió un error al modificar el manga.");
            })
        // updateManga(id, formData)
        //     .then(data => navigate("/"))
        //     .catch(err => console.log(err))
    }

    const baseInputClass = "w-full border border-gray-300 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"

    return (
        <div className="max-w-2xl mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Modificar Manga</h2>
                <Link to="/admin/mangas" className="text-blue-600 hover:underline font-semibold">
                    &larr; Volver atrás
                </Link>
            </div>

            {loading != true && <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Nombre</label>
                    <input type="text" className={baseInputClass} name="nombre" {...register("nombre", { required: true })} defaultValue={manga?.nombre} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Autor</label>
                    <select className={baseInputClass} name="autor" {...register("autor", { required: true })} defaultValue={manga?.autor}>
                        <option value="">Seleccione un autor...</option>
                        {listaAutores.map(a => <option key={a._id} value={a.nombre}>{a.nombre}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Descripción</label>
                    <textarea className={`${baseInputClass} h-24`} name="descripcion" {...register("descripcion", { required: true })} defaultValue={manga?.descripcion}></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Portada Anterior:</label>
                    {
                        manga?.portada
                            ? <img width="100px" src={`${import.meta.env.VITE_API_URL}/portadas/${manga.portada}`} alt="" className="mb-2 rounded" />
                            : "Sin portada"
                    }
                    <label className="block text-sm font-semibold mb-1">Cambiar Portada (opcional):</label>
                    <input type="file" accept="image/*" className={baseInputClass} name="portada" {...register("portada")} />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Categoría</label>
                        <select className={baseInputClass} name="categoria" {...register("categoria", { required: true })} defaultValue={manga?.categoria}>
                            <option value="">Seleccione...</option>
                            {listaCategorias.map(c => <option key={c._id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Género</label>
                        <select className={baseInputClass} name="genero" {...register("genero", { required: true })} defaultValue={manga?.genero}>
                            <option value="">Seleccione...</option>
                            {listaGeneros.map(g => <option key={g._id} value={g.nombre}>{g.nombre}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Tipo</label>
                        <select className={baseInputClass} name="tipo" {...register("tipo", { required: true })} defaultValue={manga?.tipo}>
                            <option value="">Seleccione...</option>
                            {listaTipos.map(t => <option key={t._id} value={t.nombre}>{t.nombre}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Total de volúmenes (opcional)</label>
                        <input type="number" className={baseInputClass} name="total_volumenes" {...register("total_volumenes")} defaultValue={manga?.total_volumenes} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">URL para Leer</label>
                        <input type="text" className={baseInputClass} name="leer" {...register("leer", {required:true})} defaultValue={manga?.leer} />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Guardar cambios
                    </button>
                    <Link to="/admin/mangas" className="flex-1 text-center font-bold py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors flex items-center justify-center">
                        Cancelar
                    </Link>
                </div>
            </form>}
        </div>
    )
}

export default ModificarManga
