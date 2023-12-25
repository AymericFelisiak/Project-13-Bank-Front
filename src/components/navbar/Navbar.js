import React from 'react';
import ArgentBankLogo from '../../img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/UserSlice';

/**
 * Navbar used throughout the site
 * It changes depending of the user login state
 * - Can sign out if logged
 * - Can log if not logged
 */

export default function Navbar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(logout()); 
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {user.user ? (
                <div className="main-nav-item-wrapper">
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>{user.user.body.firstName}</span>
                    </Link>
                    <Link
                        to="/"
                        className="main-nav-item"
                        onClick={handleLogout}
                    >
                        <i className="fa fa-sign-out"></i>
                        <span>Sign Out</span>
                    </Link>
                </div>
            ) : (
                <div className="main-nav-item-wrapper">
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>Sign In</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}
