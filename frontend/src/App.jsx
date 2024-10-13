import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import CreateSkill from './pages/CreateSkill';
import ProfilePage from './pages/ProfilePage';
import Public from './pages/Public';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/skills/create' element={<CreateSkill />} />
      <Route path='/users/:username' element={<ProfilePage />} />
    </Routes>
  )
}

export default App