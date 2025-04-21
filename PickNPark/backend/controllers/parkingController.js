const Parking = require('../models/Parking');
// Reserve w time
exports.reserveSpot = async (req, res) => {
  try {
    const { spotNumber, duration } = req.body;    // duration en minutes

    if (!duration || duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive number' });
    }

    const now = new Date();
    const expires = new Date(now.getTime() + duration * 60000);

    // only if reservedBy = null
    const spot = await Parking.findOneAndUpdate(
      { spotNumber, reservedBy: null },
      { $set: { reservedBy: req.user._id, reservedAt: now, reservedUntil: expires } },
      { new: true }
    );

    if (!spot) {
      return res.status(400).json({ message: 'Spot not found or already reserve' });
    }

    return res.status(200).json({ message: 'Successfull booking', spot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serv error' });
  }
};

// release expired spots

exports.getParkingSpots = async (req, res) => {
  try {
    const now = new Date();
    await Parking.updateMany(
      { reservedUntil: { $lte: now }, reservedBy: { $ne: null } },
      { $set: { reservedBy: null, reservedAt: null, reservedUntil: null } }
    );

    const spots = await Parking.find();
    return res.status(200).json({ spots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serv error' });
  }
};

//cancel : empty reservedUntil
exports.cancelReservation = async (req, res) => {
  try {
    const { spotNumber } = req.body;
    const spot = await Parking.findOne({ spotNumber });
    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }
    if (!spot.reservedBy || spot.reservedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this reservation' });
    }

    spot.reservedBy   = null;
    spot.reservedAt   = null;
    spot.reservedUntil= null;
    await spot.save();

    return res.status(200).json({ message: 'Canceled reservation', spot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Serv error' });
  }
};

