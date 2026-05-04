import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
          <Routes>
            {/* Page d'accueil publique - sans navbar */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Routes d'auth - sans navbar */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Quiz route - sans navbar */}
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
            
            // Dans App.jsx
<Route path="/recommendedCars" element={
  <ProtectedRoute>
    <QuizRoute>
      <RecommendedCarsPage />  {/* ✅ Sans AppLayout, donc pas de Navbar */}
    </QuizRoute>
  </ProtectedRoute>
} />
            
            {/* Page d'accueil après quiz */}
            <Route path="/home" element={
              <ProtectedRoute>
                <QuizRoute>
                  <AppLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <HomePage />
                    </Suspense>
                  </AppLayout>
                </QuizRoute>
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
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;