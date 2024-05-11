const Movie = require('../Models/MoviesModel')

const getAllMovies = (filters) =>
{
    return Movie.find(filters);
}

const getMovieById = (id) =>
{
    return Movie.findById(id)
}

const addNewMovie = (obj) =>
{
    const pro = new Movie(obj);
    return pro.save();
}

const updateMovie = (id, obj) =>
{
    return Movie.findByIdAndUpdate(id, obj)
}
const deleteMovie = (id) =>
{
    return Movie.findByIdAndDelete(id);
}


module.exports = {
    getAllMovies,
    getMovieById,
    addNewMovie,
    updateMovie,
    deleteMovie
}