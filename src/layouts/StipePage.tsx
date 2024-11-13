import React from "react";
import { fetchExhibits } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import { Box, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { useSearchParams, useNavigate } from "react-router-dom";

const StipePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const navigation = useNavigate();
  const { data, error, loading } = useRequest(() => fetchExhibits(page), {
    refreshDeps: [page],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handlePageChange = (nextPage: number) => {
    navigation(`?page=${nextPage}`, { replace: true });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        All Posts
      </Typography>
      {data.total > 0 ? (
        data.data.map((exhibit: any) => <Post key={exhibit.id} {...exhibit} />)
      ) : (
        <Typography variant="h6">No posts available</Typography>
      )}
      <Pagination
        currentPage={data.page}
        totalPages={data.lastPage}
        onPageChange={(page: number) => {
          handlePageChange(page);
        }}
      />
    </Box>
  );
};

export default StipePage;
