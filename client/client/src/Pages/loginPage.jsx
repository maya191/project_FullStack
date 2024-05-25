import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssPages/cssPage.css';

const URL = 'http://localhost:4000/login';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleLogin = async () =>
    {
        if (user.userName === undefined || user.password === undefined) {
            alert('Please insert username and password!');
        } else {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (res.status === 401) {
                alert('ERROR Try Again');
            } else {
                const data = await res.json();
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('userName', data.userName);

                navigate('/Main');
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Movies - Subscriptions Web Site</h1>
            <div className="login-form">
                <h3>Login</h3>
                <input
                    className="input-field"
                    required
                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="input-field"
                    required
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                />
                <button className="button" onClick={handleLogin}>
                    Login
                </button>
                <p>New User? <Link to="/CreateAccount">Click here to create an account</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
