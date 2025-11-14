const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { upload, handleMulterError } = require('../middleware/upload');
const { auth } = require('../middleware/auth');

// Scan visiting card endpoint
router.post('/scan-visiting-card', 
  auth, 
  upload.single('image'), 
  handleMulterError,
  aiController.scanVisitingCard
);

// Validate API key endpoint
router.post('/validate-api-key', 
  auth, 
  aiController.validateApiKey
);

module.exports = router;
