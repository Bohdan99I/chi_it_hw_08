import React, { useState } from 'react';
import { fetchMyExhibits } from '../api/exhibitActions';
import Post from '../components/Post';
import ControlBar from '../components/ControlBar';
import { Box, Typography, Container, CircularProgress, Button } from '@mui/material';
import { useRequest } from 'ahooks';
import { Post as PostType, ExhibitsResponse } from '../types/post';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, run } = useRequest<ExhibitsResponse, [number]>(
    (currentPage) => fetchMyExhibits(currentPage),
    {
      defaultParams: [1],
      refreshDeps: [page],
    }
  );

  const handleLoadMore = () => {
    if (data && page < data.lastPage) {
      setPage(page + 1);
    }
  };

  if (loading && !data) {
    return (
      <>
        <ControlBar />
        <Container maxWidth="lg" sx={{ mt: '64px', p: 3, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ControlBar />
        <Container maxWidth="lg" sx={{ mt: '64px', p: 3 }}>
          <Typography color="error">Error loading posts</Typography>
        </Container>
      </>
    );
  }

  const posts = data?.data || [];
  const hasMore = data ? page < data.lastPage : false;

  return (
    <>
      <ControlBar />
      <Container maxWidth="lg" sx={{ mt: '64px', p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>My Posts</Typography>
        {posts.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </Box>
            {hasMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Typography>No posts yet. Create your first post!</Typography>
        )}
      </Container>
    </>
  );
};

export default HomePage;
