import { Link } from "react-router";

const Home = () => {
  return (
    <div className="relative flex-1 w-full flex flex-col justify-center items-center bg-gray-900 text-white p-8 overflow-hidden">
      

  <div 
    className="absolute inset-0 z-0 bg-[url('/images/bg-manga.jpg')] bg-cover bg-center opacity-20"
  ></div>
  
  <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-900/40 via-transparent to-gray-900"></div>

  <div className="relative z-10 max-w-3xl text-center space-y-8">
    

    <h1 className="text-6xl md:text-8xl font-title font-black tracking-tighter text-white drop-shadow-sm pb-2 md:pb-4">
      Bienvenido a tu gestor de mangas
    </h1>
    
    <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
      Dejá de acumular lecturas sin organizar. <span className="font-bold text-amber-400">Tsundoku</span> te permite llevar el control exacto de qué mangas ya leíste, cuáles tenés pendientes y administrar tu colección personal con facilidad.
    </p>
    
    <div className="pt-8">
      <Link 
        to="/catalogo" 
        className="inline-block bg-gray-900 text-gray-200 font-bold text-lg px-8 py-4 rounded-none border-2 border-gray-500 hover:border-white hover:text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Gestionar mangas
      </Link>
    </div>
    
    <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gray-700">
      <div>

        <div className="flex justify-center mb-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-200">Control de Lectura</h3>
        <p className="text-sm text-gray-400 mt-2">Llevá un claro registro del estado de lectura de todos tus mangas y administrá tu colección.</p>
      </div>
      
      <div>
        <div className="flex justify-center mb-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-200"> Filtrado por Categorías</h3>
        <p className="text-sm text-gray-400 mt-2">Explorá nuestro inmenso catálogo filtrando por tus demografías favoritas.</p>
      </div>
      
      <div>
        <div className="flex justify-center mb-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-200">Lectura Online</h3>
        <p className="text-sm text-gray-400 mt-2">Todos los tomos incluyen enlaces directos para leer de forma online y 100% gratuita.</p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;
