import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="nav-out">
                <Navbar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
