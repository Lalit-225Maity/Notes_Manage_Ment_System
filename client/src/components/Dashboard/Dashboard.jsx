import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
 
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const Dashboard = ({ setcr }) => {
    const location = useLocation();

    return (
        <div className='dashboard'>
            <Helmet>
                <title>LalitNest</title>
                <link rel="shortcut icon" href="/notes.png" type="image/x-icon" />
            </Helmet>
            <Sidebar />

            {!location.pathname.includes('profile') && <Navbar setcr={setcr} />}
            <Outlet />

        </div>
         
    )
}

export default Dashboard
