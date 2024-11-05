import React, { useState } from 'react';
import { createExhibit } from '../api/exhibitActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const NewPostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = () => {
    createExhibit({ title, content }).then(() => {
      navigate('/home');
    });
  };

  return (
    <Box>
      <Typography variant="h4">New Post</Typography>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} multiline rows={4} />
      <Button onClick={handleCreatePost}>Create Post</Button>
    </Box>
  );
};

export default NewPostPage;
