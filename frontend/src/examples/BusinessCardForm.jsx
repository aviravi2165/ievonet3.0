// Example usage of AIScanner component
import React, { useState } from 'react';
import { Button, Group, Box, TextInput, Alert } from '@mantine/core';
import { IconScan } from '@tabler/icons-react';
import AIScanner from '../components/AIScanner';
import { validateApiKey } from '../utils/api';

const BusinessCardForm = () => {
  const [scannerOpened, setScannerOpened] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [formData, setFormData] = useState({
    card_email: '',
    card_address: '',
    card_city: '',
    card_state: '',
    card_country: '',
    card_note: '',
    company_name: '',
    contact_name: '',
    job_title: '',
    phone: '',
    website: '',
    business_card_available: false
  });
  const [apiKeyError, setApiKeyError] = useState('');

  const handleScanComplete = (extractedData) => {
    setFormData(prevData => ({
      ...prevData,
      ...extractedData
    }));
  };

  const handleValidateApiKey = async () => {
    if (!apiKey.trim()) {
      setApiKeyError('API key is required');
      return;
    }

    try {
      // Note: In a real app, you would encrypt the API key before sending
      const response = await validateApiKey(apiKey);
      if (response.success) {
        setApiKeyError('');
        setScannerOpened(true);
      } else {
        setApiKeyError('Invalid API key');
      }
    } catch (error) {
      setApiKeyError('Failed to validate API key');
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Group mb="md">
        <TextInput
          placeholder="Enter Gemini API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          error={apiKeyError}
          style={{ flex: 1 }}
          type="password"
        />
        <Button
          leftIcon={<IconScan size={16} />}
          onClick={handleValidateApiKey}
          disabled={!apiKey.trim()}
        >
          Scan Card
        </Button>
      </Group>

      {apiKeyError && (
        <Alert color="red" mb="md">
          {apiKeyError}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gap: '1rem' }}>
        <TextInput
          label="Contact Name"
          placeholder="John Doe"
          value={formData.contact_name}
          onChange={handleInputChange('contact_name')}
        />

        <TextInput
          label="Job Title"
          placeholder="Software Engineer"
          value={formData.job_title}
          onChange={handleInputChange('job_title')}
        />

        <TextInput
          label="Company Name"
          placeholder="Acme Corp"
          value={formData.company_name}
          onChange={handleInputChange('company_name')}
        />

        <TextInput
          label="Email"
          placeholder="john@example.com"
          value={formData.card_email}
          onChange={handleInputChange('card_email')}
          type="email"
        />

        <TextInput
          label="Phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleInputChange('phone')}
        />

        <TextInput
          label="Website"
          placeholder="https://www.example.com"
          value={formData.website}
          onChange={handleInputChange('website')}
        />

        <TextInput
          label="Address"
          placeholder="123 Main St, City, State 12345"
          value={formData.card_address}
          onChange={handleInputChange('card_address')}
        />

        <Group>
          <TextInput
            label="City"
            placeholder="New York"
            value={formData.card_city}
            onChange={handleInputChange('card_city')}
            style={{ flex: 1 }}
          />

          <TextInput
            label="State"
            placeholder="NY"
            value={formData.card_state}
            onChange={handleInputChange('card_state')}
            style={{ flex: 1 }}
          />

          <TextInput
            label="Country"
            placeholder="USA"
            value={formData.card_country}
            onChange={handleInputChange('card_country')}
            style={{ flex: 1 }}
          />
        </Group>

        <TextInput
          label="Notes"
          placeholder="Additional notes about the contact"
          value={formData.card_note}
          onChange={handleInputChange('card_note')}
        />
      </Box>

      <AIScanner
        opened={scannerOpened}
        onClose={() => setScannerOpened(false)}
        onScanComplete={handleScanComplete}
        apiKey={apiKey}
      />
    </Box>
  );
};

export default BusinessCardForm;
