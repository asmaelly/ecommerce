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
        // Check if user has completed quiz
        checkQuizStatus();
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const checkQuizStatus = async () => {
    try {
      const response = await getQuizResults();
      if (response.data) {
        setQuizCompleted(true);
      }
    } catch (error) {
      setQuizCompleted(false);
    }
  };

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setQuizCompleted(false);
    return response.data;
  };

  const register = async (userData) => {
    const response = await registerApi(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setQuizCompleted(false);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setQuizCompleted(false);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
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
      checkQuizStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};