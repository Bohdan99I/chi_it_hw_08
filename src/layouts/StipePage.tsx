import React, { useState, useEffect } from 'react';
import { fetchExhibits } from '../api/exhibitActions';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { Box, Typography } from '@mui/material';

const StipePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExhibits().then((data) => {
      if (data && data.posts) {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } else {
        setError('Error loading posts');
      }
    }).catch((err) => {
      setError('Error loading posts');
      console.error(err);
    });
  }, [currentPage]);

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <Typography variant="h6">No posts available</Typography>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  );
};

export default StipePage;
