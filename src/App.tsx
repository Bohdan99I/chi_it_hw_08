import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StipePage from './layouts/StipePage';
import NewPostPage from './layouts/NewPostPage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import { validateToken, logout } from './store/slices/userSlice';
import { RootState, AppDispatch } from './store/store';
import { tokenStorage } from './utils/tokenStorage';
import ControlBar from './components/ControlBar';
import { Box } from '@mui/material';

// Компонент для захищених маршрутів
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Зберігаємо поточний URL для перенаправлення після входу
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />;
  }

  return element;
};

// Компонент для виходу
const LogoutRoute: React.FC = () => {
  const dispatch = useDispatch();
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
          <Route path="/" element={<StipePage />} />
          <Route path="/new-post" element={<PrivateRoute element={<NewPostPage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutRoute />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
