import React, { useEffect, useState } from 'react';
import ManegeUsers from './ManegeUsers';
import '../cssPages/cssPage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const User = () =>
{
    const USERS_URL = 'http://localhost:4000/UsersDB';
    const USERS_FILE_URL = 'http://localhost:4000/UsersFile';
    const PERMISSIONS_FILE_URL = 'http://localhost:4000/Permission';
    const [users, setUsers] = useState([]);
    const [fileUsers, setFileUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try {
                const usersRes = await axios.get(USERS_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const usersFileRes = await axios.get(USERS_FILE_URL, { headers: { "x-access-token": localStorage.getItem("token") } });
                const permissionsRes = await axios.get(PERMISSIONS_FILE_URL, { headers: { "x-access-token": localStorage.getItem("token") } });

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
    const handleEditUser = (user) =>
    {
        navigate(`/EditUser/${user.id}`, { state: { user } });  // Navigate to the edit page with the user data
    };
    const handelDelete = async (id) =>
    {
        const USERS_FILE_URL = `http://localhost:4000/UsersFile/${id}`;
        const PERMISSIONS_FILE_URL = `http://localhost:4000/Permission/${id}`;
        const USER_DB_URL = `http://localhost:4000/UsersDB/${id}`
        try {
            await axios.delete(USER_DB_URL, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            });
            console.log('deleted from DB');
            await axios.delete(USERS_FILE_URL,
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                });
            console.log('deleted user file');
            await axios.delete(PERMISSIONS_FILE_URL,
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                });
            console.log('delete permission');

            // Update state after successful deletion
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            setFileUsers(prevFileUsers => prevFileUsers.filter(user => user.id !== id));
            setPermissions(prevPermissions => prevPermissions.filter(permission => permission.userId !== id));

        } catch (error) {
            console.error('Error deleting user:', error);
        }


    }
    return (
        <div>
            <ManegeUsers />
            <div className="user-container">
                {users.map((user) =>
                {
                    const fileUser = fileUsers.find(u => u.id === user.id);
                    return (
                        <div key={user.id} className='userDiv'>
                            <p><strong>Name:</strong> {fileUser?.firstName} {fileUser?.lastName}</p>
                            <p><strong>User Name:</strong> {user.userName}</p>
                            <p><strong>Session Time Out:</strong> {fileUser?.sessionTimeOut}</p>
                            <p><strong>Created Data:</strong> {fileUser?.createdDate}</p>
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
                                <button onClick={() => handleEditUser({ ...user, ...fileUser, permissions: getUserPermissions(user.id) })} className="edit-button">Edit</button>
                                <button onClick={() => handelDelete(user.id)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default User;

