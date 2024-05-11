import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:4000/newUser'
const CreateAccount = () =>
{
    const navigate = useNavigate();

    const [user, setUser] = useState({})
    const handelCreate = async () =>
    {
        if (user.userName === undefined || user.password === undefined) {
            alert('Please insert username and password!')
        }
        else {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (res.status === 404) {
                alert('ERROR USER NOT FOUND!')
            }
            else if (res.status === 409) {
                alert('ERROR USER ALREADY EXISTS')
            }
            else {
                navigate('/')

            }

        }
    }
    return (
        <div>
            <h1>Movies - Subscriptions Web Site</h1>
            <h3>Create Account</h3>
            username : <input required onChange={(e) => setUser({ ...user, userName: e.target.value })} type='text'></input> <br />
            password : <input required onChange={(e) => setUser({ ...user, password: e.target.value })} type='password'></input> <br />
            <button onClick={handelCreate}>Create</button>
        </div>
    )
}

export default CreateAccount