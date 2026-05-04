const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// Import des connexions
const connectDB = require('./config/database');

// Import des routeurs
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const profileRoutes = require('./routes/profileRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Import des middlewares
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ========== CORS CORRIGÉ (AUTORISE TON FRONTEND) ==========
app.use(cors({
  origin: 'http://localhost:5173',  // Ton frontend React/Vite
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== CONNEXION DATABASE ==========
connectDB();

// ========== ROUTES ==========
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', profileRoutes);
app.use('/api', quizRoutes);

// ========== ROUTE DE TEST POUR VÉRIFIER LA CONNEXION ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend fonctionne' });
});

// ========== GESTIONNAIRE D'ERREURS ==========
app.use(errorHandler);

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ CORS activé pour http://localhost:5173`);
});