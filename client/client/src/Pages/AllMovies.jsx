import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cssPages/cssPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Movies from './Movies';

const AllMovies = () =>
{
    const MOVIES_URL = 'http://localhost:3000/Movies';
    const SUBSCRIPTIONS_URL = 'http://localhost:3000/Subscriptions';
    const USERS_URL = 'http://localhost:4000/UsersDB';
    const PERMISSIONS_FILE_URL = 'http://localhost:4000/Permission';
    const MEMBERS_URL = 'http://localhost:3000/Members';


    const navigate = useNavigate();
    const userConnectedName = localStorage.getItem('userName');
    const [movies, setMovies] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [members, setMembers] = useState([]);


    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try {
                const moviesRes = await axios.get(MOVIES_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const subscriptionsRes = await axios.get(SUBSCRIPTIONS_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const usersRes = await axios.get(USERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const permissionsRes = await axios.get(PERMISSIONS_FILE_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const membersRes = await axios.get(MEMBERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } });

                setMovies(moviesRes.data);
                setSubscriptions(subscriptionsRes.data);
                setUsers(usersRes.data);
                setPermissions(permissionsRes.data);
                setMembers(membersRes.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const userPermissions = permissions.find(permission => users.find(user => user.userName === userConnectedName)?.id === permission.userId)?.permissions || {};

    const handleEditMovie = (movie) =>
    {
        navigate(`/EditMovie/${movie._id}`, { state: { movie } });
    };

    const handleDeleteMovie = async (id) =>
    {
        const MOVIE_URL = `${MOVIES_URL}/${id}`;
        try {
            const movieRes = await axios.delete(MOVIE_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
            console.log(movieRes);
            console.log('MOVIE DELETED');
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const getSubscriptionsForMovie = (movieId) =>
    {
        return subscriptions.filter(sub =>
            sub.movies.some(movie => movie.movieId.toString() === movieId.toString())
        ).map(sub =>
        {
            const movie = sub.movies.find(movie => movie.movieId.toString() === movieId.toString());
            return { ...sub, date: movie.date };
        });
    };

    const getYearFromDateString = (dateString) =>
    {
        return new Date(dateString).getFullYear();
    };
    const getMemberName = (memberId) =>
    {
        const member = members.find(member => member._id === memberId);
        return member ? member.name : 'Unknown Member';
    };
    return (
        <div className="movies-container">
            <Movies />
            <div className="movies-list">
                {movies.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        <h3>{movie.name} ({getYearFromDateString(movie.premiered)})</h3>
                        <img src={movie.image} alt={movie.name} className="movie-image" />
                        <div>
                            {userPermissions['updateMovie'] &&
                                <button onClick={() => handleEditMovie(movie)} className="edit-button">Edit</button>
                            }

                            {userPermissions['deleteMovies'] && (
                                <button onClick={() => handleDeleteMovie(movie._id)} className="delete-button">Delete</button>
                            )}
                        </div>
                        <div className='subsDiv'>
                            <h4>Subscriptions</h4>
                            <ul>
                                {getSubscriptionsForMovie(movie._id).map(sub => (
                                    <li key={sub._id}>
                                        <Link to={`/subscription/${sub.memberId}`}>
                                            {getMemberName(sub.memberId)}
                                        </Link> ({getYearFromDateString(sub.date)})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
