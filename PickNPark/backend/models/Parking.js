const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  spotNumber: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    default: '' 
  },
  reservedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  reservedAt: { 
    type: Date, 
    default: null 
  }
});

module.exports = mongoose.model('Parking', ParkingSchema);
