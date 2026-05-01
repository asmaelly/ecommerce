import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import QuizRoute from './components/QuizRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quiz" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <QuizRoute>
                  <HomePage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <QuizRoute>
                  <ProductPage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <QuizRoute>
                  <CartPage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/orders/new" element={
              <ProtectedRoute>
                <QuizRoute>
                  <CheckoutPage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <QuizRoute>
                  <OrdersPage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute>
                <QuizRoute>
                  <OrderDetailPage />
                </QuizRoute>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <QuizRoute>
                  <ProfilePage />
                </QuizRoute>
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;