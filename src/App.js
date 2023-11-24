import './style/sass/style.scss'
import Navbar from "./components/navbar/Navbar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';


function App() {
    return <div className="App">
        <Navbar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>;
}

export default App;
