import "./App.css";
import { useMovies } from "../hooks/useMovies";
import { useSearch } from "../hooks/useSearch";
import ListMovies from "../components/ListMovies";
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

function App() {
    const { search, setSearch, error } = useSearch();
    const [sortByYear, setSortByYear] = useState(false);
    const { movies, getMovies, loading } = useMovies({ search, sortByYear });

    const handleSubmit = (e) => {
        e.preventDefault();
        getMovies({ search });
    };

    const handleSort = () => {
        setSortByYear(!sortByYear);
    };

    const debounceMovies = useCallback(
        debounce((search) => {
            getMovies({ search });
        }, 300),
        [getMovies]
    );

    const handleChange = (event) => {
        const newQuery = event.target.value;
        if (newQuery.startsWith(" ")) return;
        setSearch(event.target.value);
        debounceMovies(newQuery);
    };

    return (
        <>
            <header className="p-4 py-4 text-white bg-gray-900 header">
                <h1 className="text-5xl font-bold text-center font-luckiest-guy">
                    Buscador de películas
                </h1>
                <div className="w-2/3 mx-auto md:w-1/2">
                    <form
                        className="mx-auto mt-4 form d-flex"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="search"
                            onChange={handleChange}
                            value={search}
                            placeholder="Buscar Spiderman, Batman, etc."
                            className="p-2 text-black rounded-md w-100 md:w-3/4"
                        />
                        <input
                            type="checkbox"
                            onChange={handleSort}
                            checked={sortByYear}
                            className="m-2"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 rounded-md"
                        >
                            Buscar
                        </button>
                    </form>
                </div>
                <div className="mt-4 text-center text-red-500">
                    {error && <p>{error}</p>}
                </div>
            </header>
            <main className="mt-32">
                <div className="container mx-auto">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <ListMovies movies={movies} />
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
