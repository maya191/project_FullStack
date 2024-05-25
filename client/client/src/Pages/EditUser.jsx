import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../cssPages/cssPage.css';
import { useNavigate } from 'react-router-dom';

import ManegeUsers from './ManegeUsers';
import axios from 'axios';

const EditUser = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state;

    const USERS_FILE_URL = `http://localhost:4000/UsersFile/${user.id}`;
    const PERMISSIONS_FILE_URL = `http://localhost:4000/Permission/${user.id}`;
    const USER_DB_URL = `http://localhost:4000/UsersDB/${user.id}`

    const id = user.id;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [userName, setUserName] = useState(user.userName);
    const [sessionTimeOut, setSessionTimeOut] = useState(user.sessionTimeOut);
    const [permissions, setPermissions] = useState(user.permissions);

    const handlePermissionChange = (e) =>
    {
        setPermissions({
            ...permissions,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        // Submit the updated user data to the server
        console.log('Updated User Data:', {
            firstName,
            lastName,
            userName,
            sessionTimeOut,
            permissions,
        });
        const userDB = {
            userName
        }
        try {
            const response = await axios.put(USER_DB_URL, userDB, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            });
            //update in file
            const userFileData = {
                id,
                firstName,
                lastName,
                createdDate: user.createdDate,
                sessionTimeOut: parseInt(sessionTimeOut) // Convert to integer
            };
            const res = await axios.put(USERS_FILE_URL, userFileData,
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                });
            const userPermissions = {
                userId: id,
                permissions
            }
            await axios.put(PERMISSIONS_FILE_URL, userPermissions,
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                });
            navigate('/Users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    const handelCancel = () =>
    {
        navigate('/Users');
    }

    return (
        <div>
            <ManegeUsers />
            <div className="user-form-container">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label>User Name:</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <label>Session Time Out:</label>
                        <input type="number" value={sessionTimeOut} onChange={(e) => setSessionTimeOut(e.target.value)} />
                    </div>
                    <p>Created Data: {user.createdDate}</p>

                    <div>
                        <label>Permissions:</label>
                        <div>
                            <input type="checkbox" name="viewSubscriptions" checked={permissions.viewSubscriptions} onChange={handlePermissionChange} />
                            <label>View Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" name="createSubscriptions" checked={permissions.createSubscriptions} onChange={handlePermissionChange} />
                            <label>Create Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" name="deleteSubscriptions" checked={permissions.deleteSubscriptions} onChange={handlePermissionChange} />
                            <label>Delete Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" name="updateSubscription" checked={permissions.updateSubscription} onChange={handlePermissionChange} />
                            <label>Update Subscription</label>
                        </div>
                        <div>
                            <input type="checkbox" name="viewMovies" checked={permissions.viewMovies} onChange={handlePermissionChange} />
                            <label>View Movies</label>
                        </div>
                        <div>
                            <input type="checkbox" name="createMovies" checked={permissions.createMovies} onChange={handlePermissionChange} />
                            <label>Create Movies</label>
                        </div>
                        <div>
                            <input type="checkbox" name="deleteMovies" checked={permissions.deleteMovies} onChange={handlePermissionChange} />
                            <label>Delete Movies</label>
                        </div>
                        <div>
                            <input type="checkbox" name="updateMovie" checked={permissions.updateMovie} onChange={handlePermissionChange} />
                            <label>Update Movie</label>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Update User</button>
                    <button onClick={handelCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );

};

export default EditUser;
