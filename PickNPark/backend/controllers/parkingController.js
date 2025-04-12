const Parking = require('../models/Parking');

exports.getParkingSpots = async (req, res) => {
  try {
    const spots = await Parking.find();
    res.status(200).json({ spots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serv Error' });
  }
};

exports.reserveSpot = async (req, res) => {
  try {
    const { parkingId } = req.body;

    // Search for parking spot by Id
    const parkingSpot = await Parking.findById(parkingId);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Wrong parking spot' });
    }
    
    // Search if parking spot is already reserved
    if (parkingSpot.reservedBy) {
      return res.status(400).json({ message: 'Already reserved' });
    }

    // Reservation : Associate User connected with req.user
    parkingSpot.reservedBy = req.user._id;
    parkingSpot.reservedAt = new Date();
    await parkingSpot.save();

    res.status(200).json({ message: 'Reservation done with succeed', spot: parkingSpot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serv error' });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { parkingId } = req.body;

    const parkingSpot = await Parking.findById(parkingId);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Wrong parking spot' });
    }

    // Verify if the parking spot is reserved by the user
    if (!parkingSpot.reservedBy || parkingSpot.reservedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to cancel the reservation' });
    }

    // Cancel reservation
    parkingSpot.reservedBy = null;
    parkingSpot.reservedAt = null;
    await parkingSpot.save();

    res.status(200).json({ message: 'Reservation cancel with succeed', spot: parkingSpot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serv error' });
  }
};
