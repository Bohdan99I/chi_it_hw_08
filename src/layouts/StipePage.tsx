import React from "react";
import { fetchExhibits } from "../api/exhibitActions";
import Post from "../components/Post";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { useRequest } from "ahooks";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { ExhibitsResponse } from "../types/post";
import ControlBar from "../components/ControlBar";

const StipePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const navigation = useNavigate();
  
  const { data, error, loading } = useRequest<ExhibitsResponse, [number]>(
    () => fetchExhibits(page),
    {
      refreshDeps: [page],
    }
  );

  if (loading) {
    return (
      <>
        <ControlBar />
        <Box sx={{ mt: '64px', p: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ControlBar />
        <Box sx={{ mt: '64px', p: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography color="error">Error loading posts</Typography>
        </Box>
      </>
    );
  }

  const handlePageChange = (newPage: number) => {
    navigation({
      search: `?page=${newPage}`,
    });
  };

  return (
    <>
      <ControlBar />
      <Container maxWidth="lg" sx={{ mt: '64px', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data?.data.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Box>

        {data && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.lastPage}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default StipePage;
