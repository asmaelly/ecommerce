
const express = require('express');
const cors = require('cors');
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

// ========== MIDDLEWARE GLOBAL ==========
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ========== CONNEXION DATABASE ==========
connectDB();

// ========== ROUTES ==========
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', profileRoutes);
app.use('/api', quizRoutes);

// ========== GESTIONNAIRE D'ERREURS (toujours à la fin) ==========
app.use(errorHandler);

// ========== START SERVER ==========
// backend/server.js
const PORT = process.env.PORT || 3000;

// ⚠️ IMPORTANT : '0.0.0.0' au lieu de 'localhost'
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📍 Accessible sur votre réseau à http://192.168.1.9:${PORT}`);
});