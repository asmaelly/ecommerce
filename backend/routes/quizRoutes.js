// backend/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { saveQuizAnswers, getQuizResults } = require('../controllers/quizController');

router.post('/quiz/save', authMiddleware, saveQuizAnswers);
router.get('/quiz/results', authMiddleware, getQuizResults);

module.exports = router;