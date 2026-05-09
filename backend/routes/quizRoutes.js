// backend/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { saveQuizAnswers, getQuizResults, getRecommendations } = require('../controllers/quizController');

// ✅ CORRECTION : Supprimez le /quiz car il est déjà dans server.js
// Le serveur utilise '/api' + ces routes = /api/quiz/save
router.post('/quiz/save', authMiddleware, saveQuizAnswers);
router.get('/quiz/results', authMiddleware, getQuizResults);
router.get('/quiz/recommendations', authMiddleware, getRecommendations);

module.exports = router;