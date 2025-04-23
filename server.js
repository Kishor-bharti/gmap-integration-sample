const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const app = express();
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

// Route to save user location
app.post('/save-location', (req, res) => {
  const { lat, lng } = req.body;

  // Validate latitude and longitude
  if (
    typeof lat !== 'number' || typeof lng !== 'number' || // Ensure they are numbers
    lat < -90 || lat > 90 ||                              // Latitude range
    lng < -180 || lng > 180                               // Longitude range
  ) {
    return res.status(400).send('Invalid latitude or longitude');
  }

  const sql = 'INSERT INTO user_locations (latitude, longitude) VALUES (?, ?)';
  db.query(sql, [lat, lng], (err, result) => {
    if (err) {
      console.error('Error saving location:', err);
      return res.status(500).send('Database error');
    }
    res.send('Location saved successfully!');
  });
});

app.get('/maps-api', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Use the API key from .env
  const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

  res.redirect(url); // Redirect the frontend to the Google Maps API
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
