const service = {
    async getMovies(page, pageSize, searchTerm) {
        const result = await fetch(endpoints.movies(page, pageSize, searchTerm));
        return await result.json();
    },
    async getMovieDetails(movieId) {
        const result = await fetch(endpoints.movie(movieId));
        return await result.json();
    },
    async deleteMovie(movieId) {
        const result = await fetch(endpoints.movie(movieId), {
            method: 'DELETE'
        })
        return result.status;
    },
    async updateMovie(movie) {
        const result = await fetch(endpoints.movie(movie.id), {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.status;
    },
    async insertMovie(movie) {
        const result = await fetch(endpoints.movieRootUrl, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await result.json();
    },
    async getMovieCount(searchTerm) {
        const result = await fetch(endpoints.movieCount(searchTerm));
        return await result.json();
    },
    async findCast(query) {
        const result = await fetch(endpoints.findCast(query));
        return await result.json();
    },
    async findDirectors(query) {
        const result = await fetch(endpoints.findDirectors(query));
        return await result.json();
    },
    async getOrigins() {
        const result = await fetch(endpoints.getOrigins);
        return await result.json();
    },
    async findGenres(query) {
        const result = await fetch(endpoints.findGenres(query));
        return await result.json();
    }
}

const rootUrl = 'http://localhost:5000';

const endpoints = {
    movieRootUrl: `${rootUrl}/movies`,
    movies: (page, pageSize, searchTerm) => `${rootUrl}/movies?page=${page}&page_size=${pageSize}&query=${searchTerm}`,
    movie: id => `${rootUrl}/movies/${id}`,
    movieCount: query => `${rootUrl}/movies/count?query=${query}`,
    findCast: query => `${rootUrl}/cast?query=${query}`,
    findDirectors: query => `${rootUrl}/directors?query=${query}`,
    findGenres: query => `${rootUrl}/genres?query=${query}`,
    getOrigins: `${rootUrl}/origins`
}

export default service;