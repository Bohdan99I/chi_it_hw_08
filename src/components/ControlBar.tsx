import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ControlBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.user?.isAuthenticated);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 0, 
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: '#000', 
              cursor: 'pointer',
              fontWeight: 600
            }}
            onClick={() => navigate('/')}
          >
            Photo Gallery
          </Typography>
          
          <Stack direction="row" spacing={2}>
            {isAuthenticated ? (
              <>
                <Button 
                  color="primary" 
                  variant="contained" 
                  onClick={() => navigate('/new-post')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3
                  }}
                >
                  New Post
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate('/logout')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3
                  }}
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ControlBar;
