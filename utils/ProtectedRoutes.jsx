import React from "react";
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    let uid = sessionStorage.getItem('uid')
    let auth = {'token': false}
    return(
        uid ? <Outlet/> : <Navigate to="/"/>
    )
};

export default ProtectedRoutes;
