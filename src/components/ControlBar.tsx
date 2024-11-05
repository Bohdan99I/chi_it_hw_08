import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ControlBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box>
      <Button onClick={() => navigate('/new-post')}>New Post</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default ControlBar;
