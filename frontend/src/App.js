// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LostAndFoundForm from './LostAndFoundForm';
import ReportList from './ReportList';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LostAndFoundForm />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-register" element={<AdminRegister />} />
                <Route path="/reports" element={<ReportList />} />
            </Routes>
        </Router>
    );
};

export default App;
