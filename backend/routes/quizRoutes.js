// backend/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { saveQuizAnswers, getQuizResults, getRecommendations } = require('../controllers/quizController');

// CORRECTED: Remove extra /quiz since it's already mounted on /api
router.post('/quiz/save', authMiddleware, saveQuizAnswers);
router.get('/quiz/results', authMiddleware, getQuizResults);
router.get('/quiz/recommendations', authMiddleware, getRecommendations);

module.exports = router;