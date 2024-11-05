import React from 'react';
import { Box, Typography } from '@mui/material';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Box>
      <Typography variant="h5">{post.title}</Typography>
      <Typography>{post.content}</Typography>
    </Box>
  );
};

export default Post;
