const Quiz = require('../models/Quiz');
const Product = require('../models/Product');

// Sauvegarder les réponses du quiz
const saveQuizAnswers = async (req, res, next) => {
  try {
    const { answers } = req.body;
    
    // Logique de recommandation basée sur les réponses
    let recommendations = [];
    
    // Exemple: Recommander des produits selon les préférences
    if (answers.budget === 'high') {
      recommendations = await Product.find({ price: { $gt: 500 } }).limit(3);
    } else if (answers.budget === 'medium') {
      recommendations = await Product.find({ price: { $gte: 100, $lte: 500 } }).limit(3);
    } else {
      recommendations = await Product.find({ price: { $lt: 100 } }).limit(3);
    }
    
    const quiz = await Quiz.findOneAndUpdate(
      { userId: req.userId },
      { answers, recommendations: recommendations.map(p => p._id), createdAt: Date.now() },
      { upsert: true, new: true }
    );
    
    res.json({ 
      message: 'Quiz answers saved', 
      recommendations: recommendations 
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les résultats du quiz
const getQuizResults = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ userId: req.userId }).populate('recommendations');
    
    if (!quiz) {
      return res.status(404).json({ error: 'No quiz found for this user' });
    }
    
    res.json({
      answers: quiz.answers,
      recommendations: quiz.recommendations,
      createdAt: quiz.createdAt
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { saveQuizAnswers, getQuizResults };