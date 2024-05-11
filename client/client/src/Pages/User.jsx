import React, { useEffect, useState } from 'react';
import ManegeUsers from './ManegeUsers';
import '../cssPages/cssPage.css';
import axios from "axios";


const User = () =>
{
    const USERS_URL = 'http://localhost:4000/UsersDB';
    const USERS_FILE_URL = 'http://localhost:4000/UsersFile';
    const PERMISSIONS_FILE_URL = 'http://localhost:4000/Permission';
    const [users, setUsers] = useState([]);
    const [fileUsers, setFileUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try {
                const usersRes = await axios.get(USERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const usersFileRes = await axios.get(USERS_FILE_URL);
                const permissionsRes = await axios.get(PERMISSIONS_FILE_URL);

                setUsers(usersRes.data.filter(user => user.id !== 99999)); // Filter out admin
                setFileUsers(usersFileRes.data);
                setPermissions(permissionsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getUserPermissions = (userId) =>
    {
        const userPermissions = permissions.find(permission => permission.userId === userId);
        return userPermissions.permissions ? userPermissions.permissions : null;
    };
    return (
        <div>
            <ManegeUsers />
            <div className="user-container">
                {users.map((user) => (
                    <div key={user.id} className='userDiv'>
                        <p><strong>Name:</strong> {fileUsers.find(u => u.id === user.id)?.firstName} {fileUsers.find(u => u.id === user.id)?.lastName}</p>
                        <p><strong>User Name:</strong> {user.userName}</p>
                        <p><strong>Session Time Out:</strong> {fileUsers.find(u => u.id === user.id)?.sessionTimeOut}</p>
                        <p><strong>Created Data:</strong> {fileUsers.find(u => u.id === user.id)?.createdDate}</p>
                        <p><strong>Permissions:</strong></p>
                        {Object.keys(getUserPermissions(user.id)).length > 0 ? (
                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                {Object.entries(getUserPermissions(user.id))
                                    .filter(([key, value]) => value === true)
                                    .map(([key, value], index) => (
                                        <li key={index}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p>No permissions</p>
                        )}



                        <div>
                            <button className="edit-button">Edit</button>
                            <button className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default User;
