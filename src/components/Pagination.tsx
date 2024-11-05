import React from 'react';
import { Box, Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button key={index} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
