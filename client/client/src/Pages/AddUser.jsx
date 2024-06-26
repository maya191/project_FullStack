import React, { useState } from 'react';
import ManegeUsers from './ManegeUsers';
import '../cssPages/cssPage.css';
import axios from "axios";

const AddUser = () =>
{
    const USERS_FILE_URL = 'http://localhost:4000/UsersFile';
    const PERMISSIONS_FILE_URL = 'http://localhost:4000/Permission';
    const USER_DB_URL = 'http://localhost:4000/UsersDB';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [sessionTimeOut, setSessionTimeOut] = useState('');
    const [permissions, setPermissions] = useState({
        viewSubscriptions: false,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscription: false,
        viewMovies: false,
        createMovies: false,
        deleteMovies: false,
        updateMovie: false
    });

    const handlePermissionChange = (e) =>
    {
        const { name, checked } = e.target;

        setPermissions(prevState =>
        {
            const newPermissions = {
                ...prevState,
                [name]: checked
            };

            if (checked) {
                if (name === "createSubscriptions" || name === "updateSubscription" || name === "deleteSubscriptions") {
                    newPermissions.viewSubscriptions = true;
                }
                if (name === "createMovies" || name === "updateMovie" || name === "deleteMovies") {
                    newPermissions.viewMovies = true;
                }
            }

            return newPermissions;
        });
    };

    const handleSubmit = async (e) =>
    {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        e.preventDefault();
        const userDB = {
            userName
        }
        try {
            // user to DB
            const userDBres = await axios.post(USER_DB_URL, userDB, { headers: { "x-access-token": localStorage.getItem("token") } });
            const id = userDBres.data.id;

            const userFileData = {
                id,
                firstName,
                lastName,
                createdDate: formattedDate,
                sessionTimeOut: parseInt(sessionTimeOut), // Convert to integer
            };
            const userPermissions = {
                userId: id,
                permissions
            }
            // user to file!
            const res = await axios.post(USERS_FILE_URL, userFileData, { headers: { "x-access-token": localStorage.getItem("token") } });
            // user permissions
            const resPermission = await axios.post(PERMISSIONS_FILE_URL, userPermissions, { headers: { "x-access-token": localStorage.getItem("token") } });

            console.log('User created:', res.data);
            console.log('Permission:', resPermission);
            // Reset form fields
            setFirstName('');
            setLastName('');
            setUserName('');
            setSessionTimeOut('');
            setPermissions({
                viewSubscriptions: false,
                createSubscriptions: false,
                deleteSubscriptions: false,
                updateSubscription: false,
                viewMovies: false,
                createMovies: false,
                deleteMovies: false,
                updateMovie: false
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <ManegeUsers />
            <div className="user-form-container">
                <h2>Create New User</h2>
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
                    <button type="submit">Create User</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser;
