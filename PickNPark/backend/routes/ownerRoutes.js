const express = require('express');
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
router.get('/', authMiddleware, ownerController.isOwner);
module.exports = router;