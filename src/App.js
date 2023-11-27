import './style/sass/style.scss';
import Navbar from './components/navbar/Navbar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
