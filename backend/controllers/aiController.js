const geminiService = require('../services/geminiService');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

class AIController {
  async scanVisitingCard(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
      }

      const { encryptedApiKey } = req.body;
      
      if (!encryptedApiKey) {
        return res.status(400).json({
          success: false,
          message: 'Gemini API key is required'
        });
      }

      const imagePath = req.file.path;
      
      try {
        const extractedData = await geminiService.scanBusinessCard(imagePath, encryptedApiKey);
        
        // Clean up uploaded file after processing
        fs.unlinkSync(imagePath);

        res.status(200).json({
          success: true,
          message: 'Business card scanned successfully',
          data: extractedData
        });

      } catch (aiError) {
        // Clean up uploaded file on AI processing error
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        throw aiError;
      }

    } catch (error) {
      logger.error('Error in scanVisitingCard controller:', error);
      
      let statusCode = 500;
      let message = 'Internal server error';
      
      if (error.message.includes('Invalid Gemini API key')) {
        statusCode = 401;
        message = 'Invalid API key';
      } else if (error.message.includes('API quota exceeded')) {
        statusCode = 429;
        message = 'API quota exceeded';
      } else if (error.message.includes('Failed to scan business card')) {
        statusCode = 400;
        message = error.message;
      }

      res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }

  async validateApiKey(req, res) {
    try {
      const { encryptedApiKey } = req.body;
      
      if (!encryptedApiKey) {
        return res.status(400).json({
          success: false,
          message: 'API key is required'
        });
      }

      // Test decryption
      try {
        geminiService.decryptApiKey(encryptedApiKey);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid API key encryption'
        });
      }

      // Create a test image (1x1 pixel) to validate API
      const testImagePath = path.join(__dirname, '../uploads/test-image.jpg');
      const testImageBase64 = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';

      // Write test image
      fs.writeFileSync(testImagePath, Buffer.from(testImageBase64, 'base64'));

      try {
        await geminiService.scanBusinessCard(testImagePath, encryptedApiKey);
        fs.unlinkSync(testImagePath);
        
        res.status(200).json({
          success: true,
          message: 'API key is valid'
        });
      } catch (error) {
        if (fs.existsSync(testImagePath)) {
          fs.unlinkSync(testImagePath);
        }
        throw error;
      }

    } catch (error) {
      logger.error('Error validating API key:', error);
      
      let statusCode = 500;
      let message = 'Internal server error';
      
      if (error.message.includes('Invalid Gemini API key') || error.message.includes('API quota exceeded')) {
        statusCode = 400;
        message = 'Invalid or expired API key';
      }

      res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
}

module.exports = new AIController();
