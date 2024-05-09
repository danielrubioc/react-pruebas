import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sortByYear }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const previousSearch = useRef(search);

    const getMovies = useMemo(() => {
        return async ({ search }) => {
            if (search === "") {
                setMovies([]);
                return;
            }

            if (search === previousSearch.current) return;

            try {
                setLoading(true);
                previousSearch.current = search;
                const movies = await searchMovies({ search });
                setMovies(movies);
                setError(null);
            } catch (error) {
                setError("Ocurrió un error al buscar las películas");
            } finally {
                setLoading(false);
            }
        };
    }, []);

    const sortedMovies = useMemo(() => {
        return sortByYear
            ? [...movies].sort((a, b) => a.year_date - b.year_date)
            : movies;
    }, [movies, sortByYear]);

    return { movies: sortedMovies, getMovies, error, loading };
}
