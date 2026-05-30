import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import QuizRoute from './components/QuizRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Import des pages
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
import RecommendationsPage from './pages/RecommendationsPage';
import RecommendedCarsPage from './pages/RecommendedCarsPage';
import FavorisPage from './pages/FavorisPage';
import AgenciesPage from './pages/AgenciesPage';
import ContactPage from './pages/ContactPage';

// Layout component for routes that require the navbar
function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Page d'accueil = HomePage (plus de LandingPage séparée) */}
              <Route path="/" element={
                <AppLayout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                </AppLayout>
              } />
              
              {/* Routes d'auth - sans navbar pour une expérience focus */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Quiz route - accessible seulement après inscription */}
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              } />
              
              {/* Pages de recommandations */}
              <Route path="/recommendations" element={
                <ProtectedRoute>
                  <RecommendationsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/recommendedCars" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <RecommendedCarsPage /> 
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Pages publiques avec navbar (accessibles sans connexion mais avec incitation) */}
              <Route path="/products/:id" element={
                <AppLayout>
                  <ProductPage />
                </AppLayout>
              } />
              
              <Route path="/agencies" element={
                <AppLayout>
                  <AgenciesPage />
                </AppLayout>
              } />
              
              <Route path="/contact" element={
                <AppLayout>
                  <ContactPage />
                </AppLayout>
              } />
              
              {/* Pages protégées (nécessitent connexion) */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <AppLayout>
                    <CartPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/favoris" element={
                <ProtectedRoute>
                  <AppLayout>
                    <FavorisPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <CheckoutPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/orders" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <OrdersPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <OrderDetailPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <ProfilePage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Redirection 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;