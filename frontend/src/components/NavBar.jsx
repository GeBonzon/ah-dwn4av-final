import { Link } from "react-router"
import { useEmail, useRol } from "../contexts/Session.context"

const NavBar = () => {
    const email = useEmail()
    const rol = useRol()

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img src="/images/hanko-logo.webp" alt="Tsundoku Logo" className="w-10 h-10 object-contain" />
                    <span className="text-3xl font-title font-black tracking-wider text-white">Tsundoku</span>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link to="/catalogo" className="font-semibold text-gray-300 hover:text-white transition-colors">
                        Catálogo
                    </Link>
                    {
                        !email ? (
                            <>
                                <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                    Iniciar sesión
                                </Link>
                                <Link to="/registro" className="font-semibold text-green-400 hover:text-green-300 transition-colors">
                                    Registro
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                {rol >= 1 && (
                                    <Link to="/admin" className="font-semibold text-blue-400 border border-blue-400 px-3 py-1.5 rounded-none hover:bg-blue-400 hover:text-gray-900 transition-colors">
                                        Panel de administración
                                    </Link>
                                )}
                                <span className="text-sm text-gray-400">{email}</span>
                                <Link to="/logout" className="font-semibold text-red-400 hover:text-red-300 transition-colors">
                                    Cerrar sesión
                                </Link>
                            </div>
                        )
                    }
                </nav>
            </div>
        </header>
    )
}

export default NavBar
