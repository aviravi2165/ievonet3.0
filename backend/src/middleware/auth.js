const { verifyToken } = require('../utils/tokenUtils');
const logger = require('../utils/logger');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Authentication error' });
  }
};

module.exports = { auth, authenticate: auth };
