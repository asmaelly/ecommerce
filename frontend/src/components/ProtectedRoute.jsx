import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  // Liste des routes publiques (accessibles sans connexion)
  const publicRoutes = ['/', '/agencies', '/contact', '/products', '/home'];
  
  // Vérifier si la route actuelle est publique
  const isPublicRoute = publicRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith('/products/')
  );
  
  console.log("🔍 ProtectedRoute - path:", location.pathname);
  console.log("🔍 ProtectedRoute - token:", !!token);
  console.log("🔍 Is public route:", isPublicRoute);
  
  // 1. Si c'est une route publique, on laisse passer TOUJOURS
  if (isPublicRoute) {
    console.log("✅ Public route, letting through");
    return children;
  }
  
  // 2. Pas de token -> redirige vers login
  if (!token) {
    console.log("❌ No token, redirect to login");
    return <Navigate to="/login" replace />;
  }
  
  // 3. Si on est sur /quiz, on laisse passer SANS vérifier le quiz
  if (location.pathname === '/quiz') {
    console.log("📋 On quiz page, letting through");
    return children;
  }
  
  // 4. Si on est sur /recommendations, on laisse passer
  if (location.pathname === '/recommendations') {
    console.log("🎯 On recommendations page, letting through");
    return children;
  }
  
  // 5. Pour les autres pages protégées, vérifier si le quiz est complété
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
  
  console.log("👤 isNewUser:", isNewUser, "hasCompletedQuiz:", hasCompletedQuiz);
  
  // Si c'est un nouveau user et qu'il n'a pas fait le quiz, rediriger vers quiz
  if (isNewUser && !hasCompletedQuiz) {
    console.log("🔄 Need quiz, redirecting to /quiz");
    return <Navigate to="/quiz" replace />;
  }
  
  console.log("✅ Access granted to:", location.pathname);
  return children;
};

export default ProtectedRoute;