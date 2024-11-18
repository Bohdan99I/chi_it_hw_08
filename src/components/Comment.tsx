import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Comment as CommentType } from '../types/post';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ fontWeight: 600 }}
        >
          User #{comment.userId}
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
        >
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography variant="body2">
        {comment.content}
      </Typography>
    </Paper>
  );
};

export default Comment;
