import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch<any>(userLogin({ username, password })).then(() => {
      navigate('/home');
    });
  };

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginForm;
