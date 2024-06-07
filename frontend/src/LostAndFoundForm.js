// src/LostAndFoundForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LostAndFoundForm = () => {
    const [report, setReport] = useState({
        itemName: '',
        description: '',
        location: '',
        contactInfo: '',
        status: 'lost'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReport({
            ...report,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/reports', report);
            console.log(response.data);
            alert('Report submitted successfully!');
            setReport({
                itemName: '',
                description: '',
                location: '',
                contactInfo: '',
                status: 'lost'
            });
        } catch (error) {
            console.error('Ada kesalahan saat mengirim laporan:', error);
            alert('Failed to submit report.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Lost & Found Report</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        value={report.itemName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={report.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={report.location}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="contactInfo">Contact Info:</label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={report.contactInfo}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={report.status}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Submit Report
                </button>
            </form>
            <button onClick={() => navigate('/admin-login')} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                Login as Admin
            </button>
            <button onClick={() => navigate('/admin-register')} style={{ width: '100%', padding: '10px', backgroundColor: '#ffc107', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                Register as Admin
            </button>
        </div>
    );
};

export default LostAndFoundForm;
