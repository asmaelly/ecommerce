import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuizRoute = ({ children }) => {
  const { user } = useAuth();
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
  
  // Vérifier si c'est un nouveau membre qui n'a pas encore complété le quiz
  const needsQuiz = isNewUser && !hasCompletedQuiz;
  
  if (needsQuiz) {
    return <Navigate to="/quiz" />;
  }
  
  return children;
};

export default QuizRoute;