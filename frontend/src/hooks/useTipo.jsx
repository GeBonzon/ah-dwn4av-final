import { useState, useEffect } from "react";
import { useTiposService } from "../services/tipos.service";
/**
 * Custom hook para obtener todos los tipos y poder usarlos en cosas como los selects de formualrios o fitlros por ej
 */
export const useTipos = () => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getTipos } = useTiposService();

    useEffect(() => {
        setLoading(true);
        getTipos()
            .then(data => setTipos(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return { tipos, loading };
};
