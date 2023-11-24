import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, loginUser } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/profile');
        }
    });

    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredentials = { email, password };
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
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    {error && <div role="alert">{error}</div>}
                </form>
            </section>
        </main>
    );
}
