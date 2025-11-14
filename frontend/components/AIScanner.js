import React, { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Modal, 
  Group, 
  Text, 
  Alert, 
  Stack, 
  Image,
  ActionIcon,
  Tooltip,
  LoadingOverlay
} from '@mantine/core';
import { 
  IconUpload, 
  IconX, 
  IconCamera, 
  IconScan,
  IconAlertCircle,
  IconCheck
} from '@tabler/icons-react';
import { scanVisitingCard } from '../services/api';

const AIScanner = ({ opened, onClose, onScanComplete, apiKey }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setImageFile(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScan = async () => {
    if (!imageFile || !apiKey) {
      setError('Please provide both image and API key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('encryptedApiKey', apiKey);

      const response = await scanVisitingCard(formData);
      
      if (response.success) {
        onScanComplete(response.data);
        handleClose();
      } else {
        setError(response.message || 'Failed to scan business card');
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError(err.response?.data?.message || 'Failed to scan business card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Scan Business Card"
      size="md"
      centered
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      
      <Stack spacing="md">
        {error && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            color="red"
            title="Error"
          >
            {error}
          </Alert>
        )}

        {!imagePreview ? (
          <Box
            sx={(theme) => ({
              border: `2px dashed ${theme.colors.gray[3]}`,
              borderRadius: theme.radius.md,
              padding: theme.spacing.xl,
              textAlign: 'center',
              backgroundColor: theme.colors.gray[0],
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: theme.colors.blue[5],
                backgroundColor: theme.colors.blue[0]
              }
            })}
            onClick={() => fileInputRef.current?.click()}
          >
            <Stack spacing="sm" align="center">
              <IconUpload size={48} color="#666" />
              <Text size="lg" weight={500}>Upload Business Card</Text>
              <Text size="sm" color="dimmed">
                Click to select or drag and drop
              </Text>
              <Text size="xs" color="dimmed">
                JPEG, PNG, WebP (Max 5MB)
              </Text>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ position: 'relative' }}>
            <Image
              src={imagePreview}
              alt="Business card preview"
              radius="md"
              sx={{ maxHeight: 300, objectFit: 'contain' }}
            />
            <ActionIcon
              color="red"
              variant="filled"
              size="sm"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10
              }}
              onClick={handleRemoveImage}
            >
              <IconX size={14} />
            </ActionIcon>
          </Box>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <Group position="apart">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            leftIcon={<IconScan size={16} />}
            onClick={handleScan}
            disabled={!imageFile || !apiKey || loading}
          >
            Scan Card
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AIScanner;
