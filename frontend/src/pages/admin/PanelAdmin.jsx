import { Link } from "react-router";

const PanelAdmin = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Panel de administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/admin/mangas" 
          className="bg-white p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-4 group"
        >
          <div className="text-blue-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 group-hover:text-blue-600">Gestión de mangas</h2>
          <p className="text-gray-500 text-center text-sm">Administrar el catálogo completo de mangas.</p>
        </Link>

        <Link 
          to="/admin/autores" 
          className="bg-white p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-4 group"
        >
          <div className="text-purple-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 group-hover:text-purple-600">Gestión de autores</h2>
          <p className="text-gray-500 text-center text-sm">Administrar los autores disponibles en el sistema.</p>
        </Link>
      </div>
    </div>
  );
};

export default PanelAdmin;
