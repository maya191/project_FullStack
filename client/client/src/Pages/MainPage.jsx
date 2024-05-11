import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssPages/cssPage.css';


const MainPage = () =>
{
    const navigate = useNavigate();
    const handleLogOut = () =>
    {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="main-container">
            <h1>Movies - Subscriptions Web Site</h1>
            <nav className="navbar">
                <ul className="nav-list">
                    <li>
                        <Link className="nav-link" to="/Movies">Movies</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/Subscriptions">Subscriptions</Link>
                    </li>
                    {localStorage.getItem('userName') === 'Admin' && (
                        <li>
                            <Link className="nav-link" to="/Usermanagment">User Management</Link>
                        </li>
                    )}
                    <button className="logout-button" onClick={handleLogOut}>Logout</button>
                </ul>
            </nav>
        </div>
    );
};

export default MainPage;
