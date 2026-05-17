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
import LandingPage from './pages/LandingPage';
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

// Simple auth check function
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Routes d'auth - sans navbar */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Quiz route - SIMPLE CHECK WITHOUT ProtectedRoute */}
              <Route path="/quiz" element={
    <ProtectedRoute>
      <QuizPage />
    </ProtectedRoute>
  } />
              
              {/* Page de recommandations avec chargement */}
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
              
              <Route path="/home" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <HomePage />
                    </Suspense>
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              {/* Page produit */}
              <Route path="/product/:id" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <ProductPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Page panier */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <CartPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Page favoris */}
              <Route path="/favoris" element={
                <ProtectedRoute>
                  <AppLayout>
                    <FavorisPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
<Route path="/agencies" element={
  <ProtectedRoute>
    <AppLayout>
      <AgenciesPage />
    </AppLayout>
  </ProtectedRoute>
} />
<Route path="/contact" element={
  <ProtectedRoute>
    <AppLayout>
      <ContactPage />
    </AppLayout>
  </ProtectedRoute>
} />
              {/* Page checkout */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <CheckoutPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Page commandes */}
              <Route path="/orders" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <OrdersPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Page détail commande */}
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <OrderDetailPage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
              
              {/* Page profil */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <QuizRoute>
                    <AppLayout>
                      <ProfilePage />
                    </AppLayout>
                  </QuizRoute>
                </ProtectedRoute>
              } />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;