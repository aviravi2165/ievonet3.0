const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
