const express = require('express');

const MovieService = require('../Services/MoviesService')
const router = express.Router();

//Get All Movies
router.get('/', async (req, res) =>
{
    try {
        const filters = req.query;
        const Movies = await MovieService.getAllMovies(filters);
        res.send(Movies);
    } catch (error) {
        res.send(error);
    }
});

// Get Movie by ID
router.get('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const Movie = await MovieService.getMovieById(id);
        res.send(Movie);
    } catch (error) {
        res.send(error);
    }
});

// Add a new Movie
router.post('/', async (req, res) =>
{
    try {
        const obj = req.body;
        const result = await MovieService.addNewMovie(obj);
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update a Movie
router.put('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await MovieService.updateMovie(id, obj);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

//delete Movie
router.delete('/:id', async (req, res) =>
{
    try {
        const { id } = req.params;
        const result = await MovieService.deleteMovie(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;



