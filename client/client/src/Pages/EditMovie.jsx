import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../cssPages/cssPage.css';
import { useNavigate } from 'react-router-dom';
import Movies from './Movies';
import axios from 'axios';

const EditMovie = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { movie } = location.state;

    const MOVIES_URL = 'http://localhost:3000/Movies';

    const [movieName, setMovieName] = useState(movie.name);
    const [genres, setGenres] = useState(movie.genres.join(', ')); // Convert array to comma-separated string
    const [imgURL, setImageURL] = useState(movie.image);
    const [premiered, setPremiered] = useState(movie.premiered);

    const formatDate = (dateString) =>
    {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if necessary
        let day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if necessary
        return `${year}-${month}-${day}`;
    };
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const updatedMovie = {
            ...movie,
            name: movieName,
            genres: genres.split(',').map(genre => genre.trim()), // Convert comma-separated string to array
            image: imgURL,
            premiered: premiered,
        };

        try {
            await axios.put(`${MOVIES_URL}/${movie._id}`, updatedMovie, {
                headers: { "x-access-token": localStorage.getItem("token") },
            });
            console.log('MOVIE UPDATED');
            navigate('/AllMovies');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleCancel = () =>
    {
        navigate('/AllMovies');
    };

    return (
        <div>
            <Movies />
            <div className="user-form-container">

                <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                    </div>
                    <div>
                        <label>Genres (comma separated):</label>
                        <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" value={imgURL} onChange={(e) => setImageURL(e.target.value)} />
                    </div>
                    <div>
                        <label>Premiered:</label>
                        <input type="date" value={formatDate(premiered)} onChange={(e) => setPremiered(e.target.value)} />
                    </div>

                    <button type="submit">Update Movie</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditMovie;
