import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssPages/cssPage.css';

import MainPage from './MainPage';
const ManegeUsers = () =>
{
    return (
        <>
            <MainPage />
            <div className='manegeUser'>
                <h2>Users</h2>
                <nav className="navbarManege">
                    <ul className="nav-list">
                        <li >
                            <Link className="nav-link" to="/Users">All Users</Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/AddUser">Add User</Link></li>
                    </ul>
                </nav>

            </div>


        </>
    )
}

export default ManegeUsers