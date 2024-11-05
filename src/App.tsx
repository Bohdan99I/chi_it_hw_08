import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './layouts/HomePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import NewPostPage from './layouts/NewPostPage';
import StipePage from './layouts/StipePage';

interface ProtectedRouteProps {
  children: ReactNode;
  isAllowed: boolean;
}

function ProtectedRoute({ children, isAllowed }: ProtectedRouteProps): JSX.Element {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

interface RootState {
  user: {
    isAuthenticated: boolean;
  };
}

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<StipePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/home"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/new-post"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <NewPostPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
