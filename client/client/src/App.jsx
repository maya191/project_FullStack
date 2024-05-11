import React from "react"
import LoginPage from './Pages/loginPage'
import MainPage from "./Pages/MainPage"
import CreateAccount from "./Pages/CreateAccount"
import ManegeUsers from "./Pages/ManegeUsers"
import User from "./Pages/User"
import AddUser from "./Pages/AddUser"
import { Routes, Route, Link } from 'react-router-dom';

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
      </Routes>

    </>
  )
}

export default App
