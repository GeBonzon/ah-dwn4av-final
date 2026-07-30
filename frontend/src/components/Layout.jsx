import { Outlet } from "react-router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NavBar from "./NavBar"
import { useEffect } from "react"
import socket from "../services/socket.service"

const Layout = () => {
    useEffect(() => {
        socket.on("autor-nuevo", () => toast.success("¡Se agregó un nuevo autor!", { position: "top-center", autoClose: 2500, theme: "colored" }))
        socket.on("autor-editado", () => toast.info("¡Un autor fue actualizado!", { position: "top-center", autoClose: 2500, theme: "colored" }))
        socket.on("autor-borrado", () => toast.error("¡Un autor fue eliminado!", { position: "top-center", autoClose: 2500, theme: "colored" }))

        socket.on("manga-nuevo", () => toast.success("¡Se agregó un nuevo manga al catálogo!", { position: "top-center", autoClose: 2500, theme: "colored" }))
        socket.on("manga-editado", () => toast.info("¡Se acaba de actualizar un manga!", { position: "top-center", autoClose: 2500, theme: "colored" }))
        socket.on("manga-borrado", () => toast.error("¡Se acaba de eliminar un manga del catálogo!", { position: "top-center", autoClose: 2500, theme: "colored" }))
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar />

            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-gray-400 text-center p-6 text-sm mt-auto border-t border-gray-700">
                <p>&copy; 2026 Tsundoku. Aplicaciones Híbridas - Final.</p>
            </footer>

            <ToastContainer 
                position="bottom-right"
                autoClose={3000}
                theme="light"
            />
        </div>
    )
}

export default Layout
