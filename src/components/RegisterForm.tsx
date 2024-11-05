import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../store/slices/userSlice';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(userRegister({ username, password })).then(() => {
      navigate('/home');
    });
  };

  return (
    <Box>
      <Typography variant="h4">Register</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default RegisterForm;
