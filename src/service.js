const service = {
    async getMovies(page, pageSize) {
        const result = await fetch(endpoints.movies(page, pageSize));
        return await result.json();
    },
    async getMovieDetails(movieId) {
        const result = await fetch(endpoints.movie(movieId));
        return await result.json();
    }
}


const endpoints = {
    movies: (page, pageSize) => `http://localhost:5000/movies?page=${page}&page_size=${pageSize}`,
    movie: (id) => `http://localhost:5000/movies/${id}`
}

export default service;