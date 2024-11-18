import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../store/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';

interface RootState {
  user: {
    status: string;
    error: string | null;
  };
}

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    try {
      await dispatch<any>(userRegister({ username, password, name: username }));
      navigate('/login');
    } catch (err) {
      // Error handling is done in Redux
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Register
        </Typography>
        
        {error && <Alert severity="error">{error}</Alert>}
        {passwordError && <Alert severity="error">{passwordError}</Alert>}
        
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleRegister}
          disabled={status === 'loading'}
          sx={{ mt: 2 }}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterForm;
