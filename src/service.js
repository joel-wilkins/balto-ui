const service = {
    async getMovies(page, pageSize) {
        const result = await fetch(endpoints.movies(page, pageSize));
        return await result.json();
    },
    async getMovieDetails(movieId) {
        const result = await fetch(endpoints.movie(movieId));
        return await result.json();
    },
    async getMovieCount() {
        const result = await fetch(endpoints.movieCount);
        return await result.json();
    },
    async findCast(query) {
        const result = await fetch(endpoints.findCast(query));
        return await result.json();
    },
    async findDirectors(query) {
        const result = await fetch(endpoints.findDirectors(query));
        return await result.json();
    }
}


const endpoints = {
    movies: (page, pageSize) => `http://localhost:5000/movies?page=${page}&page_size=${pageSize}`,
    movie: id => `http://localhost:5000/movies/${id}`,
    movieCount: 'http://localhost:5000/movies/count',
    findCast: query => `http://localhost:5000/cast?query=${query}`,
    findDirectors: query => `http://localhost:5000/directors?query=${query}`
}

export default service;