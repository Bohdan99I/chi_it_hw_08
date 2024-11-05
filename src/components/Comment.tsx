import React from 'react';
import { Box, Typography } from '@mui/material';

interface CommentProps {
  comment: {
    id: string;
    author: string;
    content: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Box>
      <Typography variant="subtitle1">{comment.author}</Typography>
      <Typography>{comment.content}</Typography>
    </Box>
  );
};

export default Comment;
