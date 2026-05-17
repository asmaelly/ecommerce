const Quiz = require('../models/Quiz');
const Product = require('../models/Product');

// Sauvegarder les réponses du quiz
const saveQuizAnswers = async (req, res, next) => {
  try {
    const { answers } = req.body;
    
    console.log(' Réponses du quiz reçues:', answers);
    
    // Logique de recommandation améliorée
    let query = {};
    
    // Budget filter
    if (answers.budget) {
      if (answers.budget === 'low') query.pricePerDay = { $lt: 500 };
      else if (answers.budget === 'medium') query.pricePerDay = { $gte: 500, $lte: 1000 };
      else if (answers.budget === 'high') query.pricePerDay = { $gt: 1000 };
    }
    
    // Fuel type filter
    if (answers.fuelType && ['Essence', 'Diesel', 'Hybride', 'Électrique'].includes(answers.fuelType)) {
      query.fuelType = answers.fuelType;
    }
    
    // Car type filter (map to product types)
    if (answers.carType) {
      if (answers.carType === 'Citadine') {
        query.type = { $in: ['Dacia Sandero', 'Citroën C3', 'Peugeot 208', 'Renault Clio'] };
      } else if (answers.carType === 'SUV') {
        query.type = { $in: ['Dacia Duster', 'Citroën C5 Aircross', 'Peugeot 3008', 'Renault Captur'] };
      } else if (answers.carType === 'Berline') {
        query.type = { $in: ['Dacia Logan', 'BMW Série 3', 'Tesla Model 3'] };
      }
    }
    
    let products = await Product.find(query);
    
    // If no products found, relax the query
    if (products.length === 0) {
      console.log('No products found with strict filters, relaxing query...');
      const relaxedQuery = {};
      if (answers.budget) {
        if (answers.budget === 'low') relaxedQuery.pricePerDay = { $lt: 500 };
        else if (answers.budget === 'medium') relaxedQuery.pricePerDay = { $gte: 500, $lte: 1000 };
        else if (answers.budget === 'high') relaxedQuery.pricePerDay = { $gt: 1000 };
      }
      products = await Product.find(relaxedQuery);
    }
    
    // Calculate scores
    const recommendations = products.map(product => {
      let score = 50;
      
      // Budget score
      if (answers.budget === 'low' && product.pricePerDay < 500) score += 30;
      else if (answers.budget === 'medium' && product.pricePerDay >= 500 && product.pricePerDay <= 1000) score += 30;
      else if (answers.budget === 'high' && product.pricePerDay > 1000) score += 30;
      
      // Fuel type score
      if (answers.fuelType && product.fuelType === answers.fuelType) score += 20;
      
      // Car type score (simple matching based on product name)
      if (answers.carType) {
        if (answers.carType === 'Citadine' && 
            ['Dacia Sandero', 'Citroën C3', 'Peugeot 208', 'Renault Clio'].includes(product.type)) {
          score += 25;
        } else if (answers.carType === 'SUV' && 
                   ['Dacia Duster', 'Citroën C5 Aircross', 'Peugeot 3008', 'Renault Captur'].includes(product.type)) {
          score += 25;
        } else if (answers.carType === 'Berline' && 
                   ['Dacia Logan', 'BMW Série 3', 'Tesla Model 3'].includes(product.type)) {
          score += 25;
        }
      }
      
      // Rating score
      if (product.rating) score += Math.min(15, product.rating * 3);
      
      return { ...product.toObject(), score: Math.min(100, score) };
    });
    
    recommendations.sort((a, b) => b.score - a.score);
    const topRecommendations = recommendations.slice(0, 10);
    
    // Save quiz
    await Quiz.findOneAndUpdate(
      { userId: req.userId },
      { 
        answers, 
        recommendations: topRecommendations.map(p => p._id),
        createdAt: Date.now() 
      },
      { upsert: true, new: true }
    );
    
    res.json({ message: 'Quiz saved', recommendations: topRecommendations });
  } catch (error) {
    console.error('❌ Erreur:', error);
    next(error);
  }
};

const getQuizResults = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ userId: req.userId });
    
    if (!quiz) {
      return res.json({ completed: false, answers: null });
    }
    
    res.json({
      completed: true,
      answers: quiz.answers,
      recommendations: quiz.recommendations
    });
  } catch (error) {
    console.error('❌ Erreur getQuizResults:', error);
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ userId: req.userId });
    
    if (!quiz) {
      return res.status(404).json({ error: 'No quiz found' });
    }
    
    const recommendations = await Product.find({
      _id: { $in: quiz.recommendations || [] }
    });
    
    res.json({ recommendations: recommendations });
  } catch (error) {
    console.error('❌ Erreur getRecommendations:', error);
    next(error);
  }
};

module.exports = { saveQuizAnswers, getQuizResults, getRecommendations };