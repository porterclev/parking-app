const Parking = require('../models/Parking');
const ParkingLot = require('../models/ParkingLots');

// Reserve w time
exports.reserveSpot = async (req, res) => {
  try {
    console.log("reserving spot");
    const { spot, duration, lot, date, user } = req.body;    // duration en minutes
    console.log(req.body)
    if (!duration || duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive number' });
    }

    const now = new Date();
    const expires = new Date(now.getTime() + duration * 60000);

    // only if reservedBy = null
    const reservation = await Parking.create(
      { 
        spaceId: spot.id,
        lot: lot.id,
        spotNumber: spot.number, 
        reservedUntil: expires,
        location: lot.address,
        reservedBy: user._id,
        reservedAt: date,
        isActive: true,
      },
    );

    // if (!reservation) {
    //   return res.status(400).json({ message: 'Spot not found or already reserve' });
    // }

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
    console.log('Current time:', now);
    const result = await Parking.updateMany(
      { reservedUntil: { $lte: now }, isActive: true },
      { $set: { isActive: false } }
    );
    console.log('Updated spots:', result);

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

//list spots owned by authenticated user
exports.getSpotsByOwner = async (req, res) => {
  try {
    const spots = await Parking.find({ owner: req.user._id });
    return res.status(200).json({ spots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//assign owner to parking spot to the authenticated user
exports.assignOwner = async (req, res) => {
  try {
    const { spotNumber } = req.body;
    const spot = await Parking.findOne({ spotNumber });
    if (!spot) {
      return res.status(404).json({ message: 'Place introuvable' });
    }
    if (spot.owner) {
      return res.status(400).json({ message: 'Place déjà possédée' });
    }
    spot.owner = req.user._id;
    await spot.save();
    return res.status(200).json({ message: 'Propriété assignée', spot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createParking = async (req, res) => {
  try {
    console.log(req.body);
    
    const { user, id, lat, lng, name, address, availableSpots, levels, hasElevator, totalSpots, hourlyRate, dailyRate } = req.body;
    if(user.owner !== true) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const parkingLot = await ParkingLot.create({
      id,
      lat,
      lng,
      name,
      address,
      availableSpots,
      levels,
      hasElevator,
      totalSpots,
      hourlyRate,
      dailyRate,
      owner: user._id,
      ownerName: user.username,
    });
    return res.status(201).json({ message: 'Parking spot created', parkingLot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
    
  }
}
exports.getParkingLots = async (req, res) => {
  try {
    const parkingLots = await ParkingLot.find();
    if (!parkingLots) {
      return res.status(404).json({ message: 'No parking lots found' });
    }
    return res.status(200).json({ parkingLots });
  } catch (error) {
    console.error('Error in getParkingLots:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.removeParkingLot = async (req, res) => {
  console.log("removing parking lot");
  try {
    const { user, id } = req.body;
    const parkinglot = await ParkingLot.find({id: id});
    console.log(parkinglot);
    if (!parkinglot) {
      return res.status(404).json({ message: 'Parking lot not found' });
    }
    if (parkinglot[0].owner._id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await ParkingLot.deleteOne({id: id});
    return res.status(200).json({ message: 'Parking lot removed', parkinglot });
  } catch (error) {
    console.error('Error in removeParkingLot:', error);
    res.status(500).json({ message: 'Server error' });
  }
}