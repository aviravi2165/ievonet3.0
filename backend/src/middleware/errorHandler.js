const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.message === 'Unexpected end of JSON input') {
    return res.status(400).json({ message: 'Invalid JSON' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
