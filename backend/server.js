const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000; // Pastikan port benar

const corsOptions = {
    origin: 'http://localhost:3001', // Sesuaikan dengan asal frontend Anda
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'lostandfound' // Pastikan nama database benar
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Register endpoint for admin
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.execute(query, [username, hashedPassword, email], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ error: 'Username or email already exists' });
                } else {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: err.message });
                }
                return;
            }
            res.status(201).json({ message: 'Admin registered successfully' });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint for admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], async (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ message: 'Login successful' });
    });
});

// Existing routes (reports and status update)...

app.post('/api/reports', (req, res) => {
    const { itemName, description, location, contactInfo, status } = req.body;
    const query = 'INSERT INTO reports (itemName, description, location, contactInfo, status) VALUES (?, ?, ?, ?, ?)';
    db.execute(query, [itemName, description, location, contactInfo, status], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

app.get('/api/reports', (req, res) => {
    const query = 'SELECT * FROM reports';
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.put('/api/reports/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE reports SET status = ? WHERE id = ?';
    db.execute(query, [status, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Status updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
