import CardMovie from "./CardMovie";
export default function ListMovies({ movies }) {
    return (
        <>
            {movies.length === 0 ? (
                <>
                    <h2 className="mt-4 text-2xl font-bold text-center">
                        No se encontraron resultados
                    </h2>
                    <p className="text-center"> Intenta con otra búsqueda</p>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {movies.map((movie) => (
                            <CardMovie key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
