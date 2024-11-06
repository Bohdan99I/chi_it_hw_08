import React, { useEffect, useState } from 'react';
import { fetchMyExhibits } from '../api/exhibitActions';
import Post from '../components/Post';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchMyExhibits().then((data) => setPosts(data));
  }, []);

  return (
    <Box>
      <Typography variant="h4">Home Page</Typography>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default HomePage;
