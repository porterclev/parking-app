const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const authMiddleware = require('../middlewares/auth');

// Route pour récupérer toutes les places
router.get('/', authMiddleware, parkingController.getParkingSpots);

// Route pour réserver une place
router.post('/reserve', authMiddleware, parkingController.reserveSpot);

// Route pour annuler une réservation
router.post('/cancel', authMiddleware, parkingController.cancelReservation);

module.exports = router;
