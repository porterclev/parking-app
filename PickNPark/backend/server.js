// Entry point of the backend server
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const { connect } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('PICKNPARK BACKEND API');
});

// TODO: Add routes and middleware

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});