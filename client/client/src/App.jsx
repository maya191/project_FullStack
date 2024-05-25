import React from "react"
import LoginPage from './Pages/loginPage'
import MainPage from "./Pages/MainPage"
import CreateAccount from "./Pages/CreateAccount"
import ManegeUsers from "./Pages/ManegeUsers"
import User from "./Pages/User"
import AddUser from "./Pages/AddUser"
import EditUser from "./Pages/EditUser"
import Movies from "./Pages/Movies"
import AllMovies from './Pages/AllMovies'
import EditMovie from "./Pages/EditMovie"
import { Routes, Route } from 'react-router-dom';

const App = () =>
{
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Main' element={<MainPage />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path="/Usermanagment" element={<ManegeUsers />} />
        <Route path="/Users" element={<User />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/AllMovies" element={<AllMovies />} />
        <Route path="/EditMovie/:id" element={<EditMovie />} />
      </Routes>

    </>
  )
}

export default App
