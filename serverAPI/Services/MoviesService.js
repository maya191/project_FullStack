const MovieRepo = require('../Repositories/MoviesRepo')

const getAllMovies = (filters) =>
{
    return MovieRepo.getAllMovies(filters);
};

const getMovieById = (id) =>
{
    return MovieRepo.getMovieById(id)
}
const addNewMovie = (obj) =>
{
    return MovieRepo.addNewMovie(obj)
}

const updateMovie = (id, obj) =>
{
    return MovieRepo.updateMovie(id, obj)
}

const deleteMovie = (id) =>
{
    return MovieRepo.deleteMovie(id)
}

module.exports = {
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    addNewMovie
}