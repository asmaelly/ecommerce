import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  // Pour les nouveaux utilisateurs qui n'ont pas fait le quiz
  if (isNewUser && !hasCompletedQuiz) {
    return <Navigate to="/quiz" />;
  }
  
  return children;
};

export default ProtectedRoute;