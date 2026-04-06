import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllNotes from './pages/AllNotes/AllNotes'
import Pinned from './pages/Tags/Pinned/Pinned'
import Dashboard from './components/Dashboard/Dashboard'
import Work from './pages/Tags/Work/Work'
import Personal from './pages/Tags/Personal/Personal'
import Important from './pages/Tags/Important/Important'
import ProtectRoute from './ProtectedRoute/ProtectRoute'
import Login from './auth/Login'
import './App.css'
import Signup from './auth/Signup'
import Profile from './pages/Profile/Profile'
import { useState } from 'react'
const App = () => {
  const [cr, setcr] = useState(false);
  return (
    <div>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path='/' element={<Dashboard setcr={setcr}/>}>
            <Route path='/' element={<AllNotes cr={cr} />} />
            <Route path='pin' element={<Pinned />} />
            <Route path='personal' element={<Personal />} />
            <Route path='work' element={<Work />} />
            <Route path='important' element={<Important />} />
            <Route path='profile' element={<Profile/>}/>
          </Route>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
