import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuizRoute = ({ children }) => {
  const { user, loading, quizCompleted } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!quizCompleted) {
    return <Navigate to="/quiz" />;
  }

  return children;
};

export default QuizRoute;