import { useState, useEffect } from "react";
import { useGenerosService } from "../services/generos.service";
/**
 * Custom hook para obtener todos los generos y poder usarlos enc osas como los selects de formualrios o fitlros por ej
 */
export const useGeneros = () => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getGeneros } = useGenerosService();

    useEffect(() => {
        setLoading(true);
        getGeneros()
            .then(data => setGeneros(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return { generos, loading };
};
