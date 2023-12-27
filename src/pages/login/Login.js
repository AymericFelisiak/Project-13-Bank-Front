import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, loginUser } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Login page
 * If the user is already logged, the user is redirected to their profile page
 */

export default function Login() {
    // Email and password actual state, changes when the user types in input areas
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Retrieves the state of the user, null if no user
    const { loading, error, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redirects the user if already connected
    useEffect(() => {
        if(user) {
            navigate('/profile');
        }
    });

    // Handles the login event when the form is sent
    const handleLoginEvent = (e) => {
        e.preventDefault();
        const userCredentials = { email, password };
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                dispatch(fetchUserProfile(result.payload.body.token));
            }
        });
    };

    return (
        <main className="main bg-dark sign-in-container">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleLoginEvent}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    {error && <div role="alert">{error}</div>}
                </form>
            </section>
        </main>
    );
}
