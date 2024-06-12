import React from 'react';
import MainPage from './MainPage';
import '../cssPages/cssPage.css';
import { Link } from 'react-router-dom';

const Subscriptions = () =>
{
    return (
        <>
            <MainPage />
            <div className='manegeUser'>
                <h2>Subscriptions</h2>
                <nav className="navbarManege">
                    <ul className="nav-list">
                        <li >
                            <Link className="nav-link" to="/AllMembers">All Members</Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/AddMember">Add Member</Link></li>
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default Subscriptions;