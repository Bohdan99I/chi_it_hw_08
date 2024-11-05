import React, { useState, useEffect } from 'react';
import { fetchMyExhibits } from '../api/exhibitActions';
import Post from '../components/Post';
import { Box } from '@mui/material';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchMyExhibits().then((data) => setPosts(data));
  }, []);

  return (
    <Box>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default HomePage;
