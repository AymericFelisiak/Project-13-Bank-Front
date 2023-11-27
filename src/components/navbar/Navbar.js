import React from 'react';
import ArgentBankLogo from '../../img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const user = useSelector((state) => state.user);

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
                <div className='main-nav-item-wrapper'>
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>{user.user.body.firstName}</span>
                    </Link>
                    <Link to="/" className="main-nav-item">
                        <i className="fa fa-sign-out"></i>
                        <span>Sign Out</span>
                    </Link>
                </div>
            ) : (
                <div className='main-nav-item-wrapper'>
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>Sign In</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}
