const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path'); // Import path module
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// MySQL setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Serve static files (e.g., index.html, script.js, etc.)
app.use(express.static(path.join(__dirname, 'gmap-integration-sample')));
console.log('Serving static files from:', path.join(__dirname, 'gmap-integration-sample'));

// Route to save user location
app.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  const sql = 'INSERT INTO user_locations (latitude, longitude) VALUES (?, ?)';
  db.query(sql, [latitude, longitude], (err, result) => {
    if (err) {
      console.error('Error saving location:', err);
      return res.status(500).send('Database error');
    }
    res.send('Location saved successfully!');
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
