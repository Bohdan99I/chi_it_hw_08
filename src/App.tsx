import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StipePage from './layouts/StipePage';
import HomePage from './layouts/HomePage';
import NewPostPage from './layouts/NewPostPage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import { validateToken, logout } from './store/slices/userSlice';
import { RootState, AppDispatch } from './store/store';
import { tokenStorage } from './utils/tokenStorage';
import ControlBar from './components/ControlBar';
import { Box } from '@mui/material';

// Компонент для захищених маршрутів (тільки для авторизованих користувачів)
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />;
  }

  return element;
};

// Компонент для публічних маршрутів (тільки для неавторизованих користувачів)
const PublicOnlyRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

// Компонент для виходу
const LogoutRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return null;
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (tokenStorage.hasToken()) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <>
      <ControlBar />
      <Box sx={{ mt: 8 }}> {/* Додаємо відступ зверху для контенту під ControlBar */}
        <Routes>
          {/* Публічний маршрут */}
          <Route path="/" element={<StipePage />} />
          
          {/* Захищені маршрути (тільки для авторизованих) */}
          <Route path="/my-posts" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/new-post" element={<PrivateRoute element={<NewPostPage />} />} />
          
          {/* Маршрути тільки для неавторизованих */}
          <Route path="/login" element={<PublicOnlyRoute element={<LoginPage />} />} />
          <Route path="/register" element={<PublicOnlyRoute element={<RegisterPage />} />} />
          
          {/* Маршрут для виходу */}
          <Route path="/logout" element={<LogoutRoute />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
