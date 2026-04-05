import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'
import { useLocation } from 'react-router-dom'
const Dashboard = () => {
    const location = useLocation();

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="nav-out">
                {!location.pathname.includes('profile') && <Navbar />}
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
