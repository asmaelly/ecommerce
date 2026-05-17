// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  console.log("ProtectedRoute - path:", location.pathname);
  console.log("ProtectedRoute - token:", !!token);
  
  // 1. Pas de token -> redirige vers login
  if (!token) {
    console.log("No token, redirect to login");
    return <Navigate to="/login" replace />;
  }
  
  // 2. Si on est sur /quiz, on laisse passer SANS vérifier le quiz
  if (location.pathname === '/quiz') {
    console.log("On quiz page, letting through");
    return children;
  }
  
  // 3. Pour les autres pages, vérifier si le quiz est complété
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
  
  console.log("isNewUser:", isNewUser, "hasCompletedQuiz:", hasCompletedQuiz);
  
  if (isNewUser && !hasCompletedQuiz) {
    console.log("Need quiz, redirecting to /quiz");
    return <Navigate to="/quiz" replace />;
  }
  
  console.log("Access granted");
  return children;
};

export default ProtectedRoute;