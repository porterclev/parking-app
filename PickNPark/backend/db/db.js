const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI); // create a .env file in the root directory of the project
        console.log('MongoDB connected!');
    } catch(error) {
        console.log('MongoDB connection failed!');
        console.error(error);
    }
};

module.exports = connectDB;