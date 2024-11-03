import React from 'react';
import { Box, Typography } from '@mui/material';

function Comment({ comment }) {
  return (
    <Box>
      <Typography variant="subtitle1">{comment.author}</Typography>
      <Typography>{comment.content}</Typography>
    </Box>
  );
}

export default Comment;
