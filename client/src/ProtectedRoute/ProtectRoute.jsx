import React from 'react'
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectRoute = () => {
  const isLoggin=localStorage.getItem("User");
  return isLoggin?<Outlet/>:<Navigate to='/login'/>
}

export default ProtectRoute
