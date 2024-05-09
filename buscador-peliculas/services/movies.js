const API_KEY = "bfd266f3";

export const searchMovies = async ({ search }) => {
    if (search === "") return null;

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
        );
        const data = await response.json();
        const movies = data.Search || [];
        return movies?.map((movie) => {
            const clearYear = movie.Year.split("–")[0];
            const year = parseInt(clearYear);

            return {
                imdbID: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                type: movie.Type,
                year: movie.Year,
                year_date: year,
            };
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};
