import React from 'react';
import MainPage from './MainPage';
import '../cssPages/cssPage.css';
import { Link, useNavigate } from 'react-router-dom';
const Movies = () =>
{

    return (
        <div>
            <>
                <MainPage />
                <div className='manegeUser'>
                    <h2>Movies</h2>
                    <nav className="navbarManege">
                        <ul className="nav-list">
                            <li >
                                <Link className="nav-link" to="/AllMovies">All Movies</Link>
                            </li>
                            <li >
                                <Link className="nav-link" to="/AddMovie">Add Movie</Link></li>
                        </ul>
                    </nav>

                </div>
            </>

        </div>
    )
}

export default Movies