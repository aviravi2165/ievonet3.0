# Visiting Card Scanner Module

This module provides AI-powered business card scanning functionality using Google Gemini Pro Vision API.

## Features

- 🤖 AI-powered text extraction from business card images
- 🔐 Secure API key encryption/decryption using crypto-js
- 📱 Mobile-responsive scanner interface
- 🖼️ Image preview and validation
- 📊 Structured data extraction and mapping
- ⚡ Real-time scanning with loading states
- 🎨 Modern UI with Mantine components

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install @google/generative-ai crypto-js
```

### 2. Environment Variables

Add to your `.env` file:

```env
# Encryption key for API keys (generate a secure random string)
ENCRYPTION_KEY=your-super-secure-encryption-key-here

# Other existing variables...
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/fullstack_db
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

### 3. Database Setup

Run the business card schema:

```bash
cd database/schemas
psql fullstack_db -f business_card_schema.sql
```

### 4. API Endpoints

- `POST /api/ai/scan-visiting-card` - Scan business card image
- `POST /api/ai/validate-api-key` - Validate Gemini API key

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install @tabler/icons-react
```

### 2. Import CSS Styles

Add to your main CSS import:

```javascript
import './styles/scanner.css';
```

### 3. Usage Example

```jsx
import React, { useState } from 'react';
import AIScanner from './components/AIScanner';

function MyComponent() {
  const [scannerOpened, setScannerOpened] = useState(false);
  const [apiKey, setApiKey] = useState('encrypted-api-key');
  const [formData, setFormData] = useState({});

  const handleScanComplete = (extractedData) => {
    setFormData(extractedData);
    console.log('Scanned data:', extractedData);
  };

  return (
    <div>
      <button onClick={() => setScannerOpened(true)}>
        Scan Business Card
      </button>
      
      <AIScanner
        opened={scannerOpened}
        onClose={() => setScannerOpened(false)}
        onScanComplete={handleScanComplete}
        apiKey={apiKey}
      />
    </div>
  );
}
```

## API Key Encryption

The module uses crypto-js to encrypt/decrypt Gemini API keys:

### Encryption (Client-side)
```javascript
import CryptoJS from 'crypto-js';

const encryptApiKey = (apiKey, encryptionKey) => {
  return CryptoJS.AES.encrypt(apiKey, encryptionKey).toString();
};
```

### Decryption (Server-side)
```javascript
const decryptApiKey = (encryptedApiKey, encryptionKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedApiKey, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
```

## Extracted Data Fields

The AI extracts the following fields from business cards:

- `email` - Email addresses
- `address` - Full physical address
- `city` - City name
- `state` - State/province
- `country` - Country
- `company_name` - Company/organization name
- `phone` - Phone numbers
- `website` - Website URLs
- `person_name` - Person's full name
- `job_title` - Job title/position
- `other_notes` - Additional information

## Database Schema

### app_config Table
Stores field definitions and metadata for the business card form.

### business_data Table
Stores the actual scanned business card data with the following key fields:
- `card_email`, `card_address`, `card_city`, `card_state`, `card_country`
- `company_name`, `contact_name`, `job_title`, `phone`, `website`
- `business_card_available` - Boolean flag for scanned cards

## File Structure

```
backend/
├── services/geminiService.js     # Gemini AI integration
├── controllers/aiController.js   # AI endpoint handlers
├── routes/ai.js                  # AI routes
├── middleware/upload.js          # File upload handling
└── src/index.js                  # Updated with AI routes

frontend/
├── components/AIScanner.js       # Scanner React component
├── src/utils/api.js              # Updated with AI API calls
├── src/styles/scanner.css        # Scanner styles
└── src/examples/BusinessCardForm.jsx # Usage example

database/
└── schemas/business_card_schema.sql  # Database schema
```

## Error Handling

The module includes comprehensive error handling for:
- Invalid file types and sizes
- API key validation failures
- Gemini API quota limits
- Network connectivity issues
- Malformed AI responses

## Security Features

- API key encryption in transit and storage
- File type validation (JPEG, PNG, WebP only)
- File size limits (5MB maximum)
- Authentication required for all endpoints
- Temporary file cleanup after processing

## Mobile Responsiveness

The scanner interface is fully responsive with:
- Touch-friendly upload area
- Optimized modal sizing for mobile devices
- Proper image scaling and preview
- Adaptive button layouts

## Testing

To test the functionality:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Encrypt the API key using the client-side encryption function
3. Use the BusinessCardForm example to test scanning
4. Verify data extraction and form mapping

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check if the API key is correctly encrypted
   - Verify the Gemini API key is valid and active

2. **"File upload failed" error**
   - Ensure image is JPEG, PNG, or WebP format
   - Check file size is under 5MB
   - Verify uploads directory permissions

3. **"AI quota exceeded" error**
   - Check Gemini API usage limits
   - Wait for quota reset or upgrade plan

4. **"Failed to parse AI response" error**
   - Image quality may be too low
   - Text might be unreadable or blurry
   - Try with a clearer image

## License

This module is part of the larger fullstack application and follows the same licensing terms.
