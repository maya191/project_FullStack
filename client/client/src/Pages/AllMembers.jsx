import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cssPages/cssPage.css';
import { useNavigate } from 'react-router-dom';
import Subscriptions from './Subscriptions';

const AllMembers = () =>
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
                const [moviesRes, subscriptionsRes, usersRes, permissionsRes, membersRes] = await Promise.all([
                    axios.get(MOVIES_URL, { headers: { "x-access-token": localStorage.getItem("token") } }),
                    axios.get(SUBSCRIPTIONS_URL, { headers: { "x-access-token": localStorage.getItem("token") } }),
                    axios.get(USERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } }),
                    axios.get(PERMISSIONS_FILE_URL, { headers: { "x-access-token": localStorage.getItem("token") } }),
                    axios.get(MEMBERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } })
                ]);

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

    const getMoviesSubscriptions = (memberId) =>
    {
        const subscription = subscriptions.find((sub) => sub.memberId === memberId);
        if (!subscription) return [];

        return subscription.movies.map(movie =>
        {
            const movieDetails = movies.find(m => m._id === movie.movieId);
            return {
                ...movie,
                name: movieDetails?.name,
                year: new Date(movie.date).getFullYear()
            };
        });
    };

    const handleEditMovie = (member) =>
    {
        // Implement edit functionality
        console.log('Edit member:', member);
    };

    const handleDeleteMovie = (memberId) =>
    {
        // Implement delete functionality
        console.log('Delete member with ID:', memberId);
    };

    return (
        <div>
            <Subscriptions />
            <div className="members-container">
                <div className="members-list">
                    {members.map((member) => (
                        <div key={member._id} className="member-card">
                            <strong>{member.name}</strong>
                            <p>Email: {member.email}</p>
                            <p>City: {member.city}</p>
                            <div>
                                {userPermissions['updateSubscription'] && (
                                    <button onClick={() => handleEditMovie(member)} className="edit-button">Edit</button>
                                )}
                                {userPermissions['deleteSubscriptions'] && (
                                    <button onClick={() => handleDeleteMovie(member._id)} className="delete-button">Delete</button>
                                )}
                            </div>
                            <div className="movies-list">
                                <h4>Movies Watched</h4>
                                <button className="subscribe-button">Subscribe to new movie</button>
                                <div >
                                    {getMoviesSubscriptions(member._id).map(movie => (
                                        <div key={movie.movieId}>
                                            <li><strong>Movie:
                                            </strong> {movie.name},<strong>
                                                    <br></br>Watched on:</strong>  {movie.year}</li>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllMembers;
