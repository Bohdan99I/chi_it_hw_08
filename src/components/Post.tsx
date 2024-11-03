import React from 'react';
import { Box, Typography } from '@mui/material';

function Post({ post }) {
  return (
    <Box>
      <Typography variant="h5">{post.title}</Typography>
      <Typography>{post.content}</Typography>
    </Box>
  );
}

export default Post;
