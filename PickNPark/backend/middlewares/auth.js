const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // get token from header (format "Bearer <token>")
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    // Extraction token
    const token = authHeader.split(' ')[1] || authHeader;
    
    // Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // search user in db
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    // add user to req object
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token invalide' });
  }
};
