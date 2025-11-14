const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto-js');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

class GeminiService {
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
  }

  decryptApiKey(encryptedApiKey) {
    try {
      const bytes = crypto.AES.decrypt(encryptedApiKey, this.encryptionKey);
      return bytes.toString(crypto.enc.Utf8);
    } catch (error) {
      logger.error('Failed to decrypt API key:', error);
      throw new Error('Invalid API key encryption');
    }
  }

  async scanBusinessCard(imagePath, encryptedApiKey) {
    try {
      const apiKey = this.decryptApiKey(encryptedApiKey);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

      const imageData = fs.readFileSync(imagePath);
      const imageBase64 = imageData.toString('base64');

      const prompt = `You are an expert at extracting structured data from visiting card images. 
Analyze the provided image and extract the following information in JSON format:

{
  "email": "extract all email addresses found, separate multiple with commas",
  "address": "extract full physical address",
  "city": "extract city name from address",
  "state": "extract state/province from address", 
  "country": "extract country from address",
  "company_name": "extract company/organization name",
  "phone": "extract all phone numbers, separate multiple with commas",
  "website": "extract website URLs",
  "person_name": "extract person's full name",
  "job_title": "extract job title/position",
  "other_notes": "any other relevant information"
}

Guidelines:
- Return empty string for fields not found
- Be accurate with email formats and phone numbers
- Extract city, state, country from address if possible
- If multiple values exist for a field, combine them with commas
- Focus on clarity and accuracy over completeness
- Return only valid JSON format, no additional text`;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: this.getMimeType(imagePath)
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const extractedData = JSON.parse(jsonMatch[0]);
      
      // Map to database field names
      return {
        card_email: extractedData.email || '',
        card_address: extractedData.address || '',
        card_city: extractedData.city || '',
        card_state: extractedData.state || '',
        card_country: extractedData.country || '',
        card_note: extractedData.other_notes || '',
        company_name: extractedData.company_name || '',
        contact_name: extractedData.person_name || '',
        job_title: extractedData.job_title || '',
        phone: extractedData.phone || '',
        website: extractedData.website || '',
        business_card_available: true
      };

    } catch (error) {
      logger.error('Gemini API error:', error);
      if (error.message.includes('API_KEY')) {
        throw new Error('Invalid Gemini API key');
      } else if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later');
      } else if (error.message.includes('JSON')) {
        throw new Error('Failed to parse AI response');
      } else {
        throw new Error('Failed to scan business card: ' + error.message);
      }
    }
  }

  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.webp':
        return 'image/webp';
      default:
        return 'image/jpeg';
    }
  }
}

module.exports = new GeminiService();
