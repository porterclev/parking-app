// Entry point of the backend server
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

connectDB();
app.use(express.json());


// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('PICKNPARK BACKEND API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);


app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});