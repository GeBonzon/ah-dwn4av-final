import { useState, useEffect } from "react";
import { useMangasService } from "../services/mangas.service";
import socket from "../services/socket.service";

/**
 * Custom hook para obtener los datos de un Manga específico por su ID.
 * @param {string} id - El ID del manga en la db
 * @returns {Object} 
 */
export const useManga = (id) => {
    const [manga, setManga] = useState(null)
    const [loading, setLoading] = useState(true)

    const { getMangaById } = useMangasService()

    useEffect(() => {
        getMangaById(id)
            .then(data => {
                setManga(data.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id])

    return { manga, loading }
}

/**
 * Custom hook para obtener el catálogo completo de mangas.
 * @returns {Object} Un objeto conteniendo { mangas, loading, error }.
 */
export const useMangas = (query = "") => {
    const [mangas, setMangas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getMangas } = useMangasService()

    const fetchMangas = () => {
        getMangas(query)
            .then(data => {
                setMangas(data)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchMangas()
        
        // Escuchamos los eventos de Websockets para recargar el catálogo
        socket.on("manga-nuevo", fetchMangas)
        socket.on("manga-editado", fetchMangas)
        socket.on("manga-borrado", fetchMangas)

        // Cleanup al desmontar
        return () => {
            socket.off("manga-nuevo", fetchMangas)
            socket.off("manga-editado", fetchMangas)
            socket.off("manga-borrado", fetchMangas)
        }
    }, [query])

    return { mangas, loading, error }
}
