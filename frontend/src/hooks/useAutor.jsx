import { useState, useEffect } from "react";
import { useAutoresService } from "../services/autores.service";
import socket from "../services/socket.service";
/**
 * Custom hook para obtener todos los autores y poder usarlos enc osas como los selects de formualrios o fitlros por ej
 */
export const useAutores = () => {
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getAutores } = useAutoresService();

    const fetchAutores = () => {
        getAutores()
            .then(data => {
                setAutores(data);
            })
            .catch(err => setError("Error al cargar los autores"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAutores();

        socket.on("autor-nuevo", fetchAutores);
        socket.on("autor-editado", fetchAutores);
        socket.on("autor-borrado", fetchAutores);

        return () => {
            socket.off("autor-nuevo", fetchAutores);
            socket.off("autor-editado", fetchAutores);
            socket.off("autor-borrado", fetchAutores);
        };
    }, []);

    return { autores, loading, error };
};

export const useAutor = (id) => {
    const [autor, setAutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getAutores } = useAutoresService();

    useEffect(() => {
        setLoading(true);
        getAutores()
            .then(data => {
                const aut = data.find(c => c._id === id);
                if (aut) {
                    setAutor(aut);
                } else {
                    setError("Autor no encontrado");
                }
            })
            .catch(() => setError("Error al cargar el autor"))
            .finally(() => setLoading(false));
    }, [id]);

    return { autor, loading, error };
};
