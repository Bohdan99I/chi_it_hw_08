import React, { useState, useRef } from 'react';
import { createExhibit } from '../api/exhibitActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const NewPostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    try {
      setError('');
      setIsSubmitting(true);

      if (!title.trim()) {
        setError('Title is required');
        return;
      }

      if (!description.trim()) {
        setError('Description is required');
        return;
      }

      if (!selectedFile) {
        setError('Image is required');
        return;
      }

      await createExhibit({
        title: title.trim(),
        description: description.trim(),
        image: selectedFile
      });

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: '64px', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Create New Post</Typography>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          error={!!error && error.includes('Title')}
          disabled={isSubmitting}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
          error={!!error && error.includes('Description')}
          disabled={isSubmitting}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileSelect}
            disabled={isSubmitting}
          />
          
          <Button
            variant="outlined"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
          >
            Select Image
          </Button>

          {previewUrl && (
            <Box 
              sx={{ 
                width: '100%', 
                maxHeight: 400, 
                overflow: 'hidden',
                borderRadius: 1,
                border: '1px solid #e0e0e0'
              }}
            >
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }} 
              />
            </Box>
          )}
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreatePost}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Post'
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default NewPostPage;
