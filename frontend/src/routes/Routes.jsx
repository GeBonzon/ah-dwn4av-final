import { createBrowserRouter } from "react-router";
import Layout from '../components/Layout.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Login from '../pages/auth/Login.jsx';
import Logout from '../pages/auth/Logout.jsx';
import Register from '../pages/auth/Register.jsx';
import Landing from '../pages/client/Landing.jsx';
import Catalogo from '../pages/client/Catalogo.jsx';
import MangaDetalle from '../pages/client/MangaDetalle.jsx';
import NuevoManga from '../pages/admin/mangas/NuevoManga.jsx';
import ModificarManga from '../pages/admin/mangas/ModificarManga.jsx';
import DeleteManga from '../pages/admin/mangas/DeleteManga.jsx';
import ListadoAutores from '../pages/admin/autores/ListadoAutores.jsx';
import NuevoAutor from '../pages/admin/autores/NuevoAutor.jsx';
import ModificarAutor from '../pages/admin/autores/ModificarAutor.jsx';
import DeleteAutor from '../pages/admin/autores/DeleteAutor.jsx';
import PanelAdmin from '../pages/admin/PanelAdmin.jsx';
import ListadoMangas from '../pages/admin/mangas/ListadoMangas.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/catalogo",
        element: <ProtectedRoute element={<Catalogo />} rol={0} />,
      },
      {
        path: "/manga/:id",
        element: <ProtectedRoute element={<MangaDetalle />} rol={0} />,
      },
      {
        path: "/manga/nuevo",
        element: <ProtectedRoute element={<NuevoManga />} rol={1} />,
      },
      {
        path: "/manga/modificar/:id",
        element: <ProtectedRoute element={<ModificarManga />} rol={1} />,
      },
      {
        path: "/manga/borrar/:id",
        element: <ProtectedRoute element={<DeleteManga />} rol={1} />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<PanelAdmin />} rol={1} />,
      },
      {
        path: "/admin/mangas",
        element: <ProtectedRoute element={<ListadoMangas />} rol={1} />,
      },

      {
        path: "/admin/autores",
        element: <ProtectedRoute element={<ListadoAutores />} rol={1} />,
      },
      {
        path: "/admin/autores/nuevo",
        element: <ProtectedRoute element={<NuevoAutor />} rol={1} />,
      },
      {
        path: "/admin/autores/modificar/:id",
        element: <ProtectedRoute element={<ModificarAutor />} rol={1} />,
      },
      {
        path: "/admin/autores/borrar/:id",
        element: <ProtectedRoute element={<DeleteAutor />} rol={1} />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/registro",
        element: <Register />
      },
      {
        path: "/logout",
        element: <Logout />
      }
    ]
  }
]);