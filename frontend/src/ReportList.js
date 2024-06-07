// src/ReportList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reports');
                setReports(response.data);
            } catch (error) {
                console.error('Ada kesalahan saat mengambil laporan:', error);
            }
        };

        fetchReports();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/reports/${id}/status`, { status: newStatus });
            setReports(reports.map(report => report.id === id ? { ...report, status: newStatus } : report));
        } catch (error) {
            console.error('Ada kesalahan saat mengubah status:', error);
        }
    };

    const filteredReports = reports.filter(report =>
        report.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lost & Found Reports</h2>
            <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredReports.map(report => (
                    <div key={report.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '300px' }}>
                        <h3>{report.itemName}</h3>
                        <p><strong>Description:</strong> {report.description}</p>
                        <p><strong>Location:</strong> {report.location}</p>
                        <p><strong>Contact Info:</strong> {report.contactInfo}</p>
                        <p><strong>Status:</strong> {report.status}</p>
                        <select
                            value={report.status}
                            onChange={(e) => handleStatusChange(report.id, e.target.value)}
                            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                        >
                            <option value="Ditemukan">Ditemukan</option>
                            <option value="Belum Ditemukan">Belum Ditemukan</option>
                            <option value="Dilaporkan">Dilaporkan</option>
                            <option value="Dalam Pencarian">Dalam Pencarian</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportList;
