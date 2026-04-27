import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllNotes from './pages/AllNotes/AllNotes'
import Pinned from './pages/Tags/Pinned/Pinned'
import Dashboard from './components/Dashboard/Dashboard'
import Work from './pages/Tags/Work/Work'
import Personal from './pages/Tags/Personal/Personal'
import Important from './pages/Tags/Important/Important'
import ProtectRoute from './ProtectedRoute/ProtectRoute'
import OTP from './auth/OTP'
import Login from './auth/Login'
import './App.css'
import Signup from './auth/Signup'
import Profile from './pages/Profile/Profile'
import { useState } from 'react'
const App = () => {
  const [cr, setcr] = useState(false);
  const [count, setcount] = useState(0);
  return (
    <div>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route element={<Dashboard setcr={setcr} count={count} />}>
            <Route path='/' element={<AllNotes cr={cr} />} />
            <Route path='pin' element={<Pinned setcount={setcount} />} />
            <Route path='personal' element={<Personal />} />
            <Route path='work' element={<Work />} />
            <Route path='important' element={<Important />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<OTP />} />
      </Routes>
    </div>
  )
}

export default App
