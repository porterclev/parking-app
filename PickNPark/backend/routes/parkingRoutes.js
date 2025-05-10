const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

const authMiddleware = require('../middlewares/auth');
const auth = require('../middlewares/auth');

//route pour récupérer toutes les places
router.get('/', authMiddleware, parkingController.getParkingSpots);

//route pour réserver une place
router.post('/reserve', authMiddleware, parkingController.reserveSpot);

//route pour annuler une réservation
router.post('/cancel', authMiddleware, parkingController.cancelReservation);

//route pour voir ses places
router.get('/my-spots', auth, parkingController.getSpotsByOwner);

//route pour assigner une place à un propriétaire
router.post('/assign-owner', authMiddleware, parkingController.assignOwner);

router.post('/createParking', authMiddleware, parkingController.createParking);

router.get('/parkinglots', authMiddleware, parkingController.getParkingLots);
router.delete('/remove', authMiddleware, parkingController.removeParkingLot);
module.exports = router;
