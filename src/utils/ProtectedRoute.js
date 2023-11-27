import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute( { children }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if(user.user === null) {
        return (<Navigate to="/login" state={{from: location}} replace />)
    }

    return children;

}