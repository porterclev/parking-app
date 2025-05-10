const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    availableSpots: { type: Number, required: true },
    levels: { type: Number, required: true },
    hasElevator: { type: Boolean, required: true },
    totalSpots: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    ownerName: { type: String, default: null },
});

module.exports = mongoose.model('ParkingLots', ParkingSchema);
