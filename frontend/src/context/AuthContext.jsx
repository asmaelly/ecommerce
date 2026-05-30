import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, register as registerApi, getProfile } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await getProfile();
        setUser(response.data);
        // Utiliser uniquement localStorage (pas d'appel API)
        const completed = localStorage.getItem('quizCompleted') === 'true';
        setQuizCompleted(completed);
      } catch (error) {
        console.error('Error checking user:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setQuizCompleted(false);
    localStorage.setItem('quizCompleted', 'false');
    localStorage.setItem('isNewUser', 'true');
    return response.data;
  };

  const register = async (userData) => {
    const response = await registerApi(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setQuizCompleted(false);
    localStorage.setItem('quizCompleted', 'false');
    localStorage.setItem('isNewUser', 'true');
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('isNewUser');
    localStorage.removeItem('quizAnswers');
    setUser(null);
    setQuizCompleted(false);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    localStorage.setItem('quizCompleted', 'true');
    localStorage.setItem('isNewUser', 'false');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      quizCompleted,
      login,
      register,
      logout,
      completeQuiz,
    }}>
      {children}
    </AuthContext.Provider>
  );
};