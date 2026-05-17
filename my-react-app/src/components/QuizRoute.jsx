// frontend/src/components/QuizRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const QuizRoute = ({ children }) => {
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
  const location = useLocation();
  
  console.log("QuizRoute - path:", location.pathname);
  console.log("QuizRoute - isNewUser:", isNewUser);
  console.log("QuizRoute - hasCompletedQuiz:", hasCompletedQuiz);
  
  // Vérifier si c'est un nouveau membre qui n'a pas encore complété le quiz
  const needsQuiz = isNewUser && !hasCompletedQuiz;
  
  // Don't redirect if we're already on the quiz page
  if (location.pathname === '/quiz') {
    return children;
  }
  
  if (needsQuiz) {
    console.log("QuizRoute: Redirecting to quiz");
    return <Navigate to="/quiz" replace />;
  }
  
  return children;
};

export default QuizRoute;