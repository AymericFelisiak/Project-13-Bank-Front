import './style/sass/style.scss';
import Navbar from './components/navbar/Navbar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import SignIn from './pages/sign-in/SignIn';
import User from './pages/user/User';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
