import { useState, useEffect } from "react";
import { useCategoriasService } from "../services/categorias.service";
/**
 * Custom hook para obtener todas las categorias y poder usarlos enc osas como los selects de formualrios o fitlros por ej
 */
export const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getCategorias } = useCategoriasService();

    useEffect(() => {
        setLoading(true);
        getCategorias()
            .then(data => setCategorias(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return { categorias, loading };
};
