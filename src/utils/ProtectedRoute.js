import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protects the Profile route to avoid unlogged user the access the page
 * Checks the state of the user, if null then redirects to Login page
 */

export default function ProtectedRoute( { children }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if(user.user === null) {
        return (<Navigate to="/login" state={{from: location}} replace />)
    }

    return children;

}