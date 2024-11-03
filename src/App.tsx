import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './layouts/HomePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import NewPostPage from './layouts/NewPostPage';
import StripePage from './layouts/StripePage';


function ProtectedRoute({ children, isAllowed }) {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<StripePage />} />
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
}

export default App;
