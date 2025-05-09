const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // get token from header (format "Bearer <token>"
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); 
    if (!authHeader) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    // Extraction token
    const token = authHeader.split(' ')[1] || authHeader;
    console.log('Extracted Token:', token);
    // Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    // search user in db
    const user = await User.findById(decoded.id);
    console.log('User Found:', user);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    // add user to req object
    req.body.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token invalide' });
  }
};
