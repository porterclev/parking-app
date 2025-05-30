import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/navcomponent';
import Footer from './components/Footer/footercomponent';
import Home from './Pages/Home';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import OwnerDashboard from './Pages/OwnerDashboard';
import About from './Pages/About';
import NoPage from './Pages/NoPage';
import ParkingHistory from './Pages/ParkingHistory';
import FindParking from './Pages/FindParking';
import Checkout from './Pages/Checkout';
import {AuthProvider} from "@/context/AuthContext.js";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Navbar />
            <Routes>      
                <Route index element={<Home />} />
                <Route path="/about" element={<About/>}/>
                <Route path="/find-parking" element={<FindParking />}/>
                <Route path="/my-spots" element={<ParkingHistory/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/checkout" element={<Checkout />}/>
                <Route path="/owner" element={<OwnerDashboard />} />
                <Route path="*" element={<NoPage/>} />
            </Routes>
            <Footer />
        </Router>
        </AuthProvider>
    );
}

export default App;
