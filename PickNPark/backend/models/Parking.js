const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  spotNumber:  { type: String, required: true },
  lot: {type: String},
  lotName: {type: String},
  spaceId: {type: String},
  location:    { type: String, default: '' },
  owner:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reservedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reservedAt:  { type: Date, default: null },
  reservedUntil:{ type: Date, default: null },
  isActive: {type: Boolean},
});

module.exports = mongoose.model('Parking', ParkingSchema);
