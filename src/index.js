import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/Store';
import { fetchUserProfile } from './store/UserSlice';

/**
 * Provides the store to all the project
 * Also chek if a token is stored in localStorage (temporary solution)
 * If there is a token then dispatch the reducer to fetch the user data (won't get data if token is invalid)
 */

const token = localStorage.getItem('jwtToken');
if(token) store.dispatch(fetchUserProfile(token));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
