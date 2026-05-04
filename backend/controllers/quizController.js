// backend/controllers/quizController.js
const Quiz = require('../models/Quiz');
const Product = require('../models/Product');

// Sauvegarder les réponses du quiz et générer des recommandations
const saveQuizAnswers = async (req, res, next) => {
  try {
    const { answers } = req.body;
    
    console.log('📝 Réponses du quiz reçues:', answers);
    
    // Logique de recommandation basée sur les réponses
    let query = {};
    
    // 1. FILTRER PAR BUDGET (pricePerDay)
    if (answers.budget) {
      if (answers.budget === 'low') {
        query.pricePerDay = { $lt: 500 };
        console.log('💰 Filtre budget: Moins de 500 DH');
      } else if (answers.budget === 'medium') {
        query.pricePerDay = { $gte: 500, $lte: 1000 };
        console.log('💰 Filtre budget: Entre 500 et 1000 DH');
      } else if (answers.budget === 'high') {
        query.pricePerDay = { $gt: 1000 };
        console.log('💰 Filtre budget: Plus de 1000 DH');
      }
    }
    
    // 2. Filtrer par type de voiture
    if (answers.carType && answers.carType !== '') {
      const carTypeMap = {
        'Citadine': ['Sandero', 'Clio', '208', 'C3', 'Golf', 'Yaris'],
        'SUV': ['Duster', '3008', 'Captur', 'C5', 'Tiguan', 'X3', 'X5', 'Q5', 'GLC', 'Kuga'],
        'Berline': ['Logan', '508', 'Série', 'A3', 'A4', 'Model 3', 'Megane', 'Talisman', 'Classe'],
        'Utilitaire': ['Berlingo', 'Partner', 'Kangoo']
      };
      
      const keywords = carTypeMap[answers.carType] || [];
      if (keywords.length > 0) {
        query.type = { $in: keywords.map(k => new RegExp(k, 'i')) };
      }
      console.log(`🚗 Filtre type: ${answers.carType}`);
    }
    
    // 3. Filtrer par carburant
    if (answers.fuelType && answers.fuelType !== '') {
      const validFuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
      if (validFuelTypes.includes(answers.fuelType)) {
        query.fuelType = answers.fuelType;
        console.log(`⛽ Filtre carburant: ${answers.fuelType}`);
      } else {
        console.log(`⚠️ Carburant non reconnu: ${answers.fuelType}, filtre ignoré`);
      }
    }
    
    console.log('🔍 Requête MongoDB:', JSON.stringify(query, null, 2));
    
    // Récupérer les produits correspondants
    let products = await Product.find(query);
    console.log(`📊 ${products.length} produit(s) trouvé(s) avec les filtres`);
    
    // Afficher les détails des produits trouvés
    products.forEach(p => {
      console.log(`   - ${p.type}: ${p.pricePerDay} DH (${p.fuelType})`);
    });
    
    // Si aucun résultat, élargir les filtres
    if (products.length === 0) {
      console.log('⚠️ Aucun produit trouvé, élargissement des filtres...');
      
      const relaxedQuery = {};
      if (answers.budget) {
        if (answers.budget === 'low') relaxedQuery.pricePerDay = { $lt: 500 };
        else if (answers.budget === 'medium') relaxedQuery.pricePerDay = { $gte: 500, $lte: 1000 };
        else if (answers.budget === 'high') relaxedQuery.pricePerDay = { $gt: 1000 };
      }
      if (answers.fuelType && ['Essence', 'Diesel', 'Hybride', 'Électrique'].includes(answers.fuelType)) {
        relaxedQuery.fuelType = answers.fuelType;
      }
      
      console.log('🔍 Requête élargie:', JSON.stringify(relaxedQuery, null, 2));
      products = await Product.find(relaxedQuery);
      console.log(`📊 ${products.length} produit(s) trouvé(s) avec filtres élargis`);
    }
    
    // Calculer un score de pertinence pour chaque produit
    const recommendations = products.map(product => {
      let score = 50; // Score de base
      
      // Bonus budget (0-30 points) - CORRIGÉ (supprimé la ligne dupliquée)
      if (answers.budget === 'low' && product.pricePerDay < 500) {
        score += 30;
      } else if (answers.budget === 'medium' && product.pricePerDay >= 500 && product.pricePerDay <= 1000) {
        score += 30;
      } else if (answers.budget === 'high' && product.pricePerDay > 1000) {
        score += 30;
      } else if (answers.budget === 'high' && product.pricePerDay > 800) {
        score += 15; // Bonus partiel pour les voitures proches du premium
      }
      
      // Bonus type de voiture (0-20 points)
      if (answers.carType === 'Berline') {
        if (product.type.includes('BMW') || product.type.includes('Mercedes') || 
            product.type.includes('Audi') || product.type.includes('Tesla') ||
            product.type.includes('508') || product.type.includes('Talisman') ||
            product.type.includes('Série') || product.type.includes('Classe')) {
          score += 20;
        } else if (product.type.includes('Logan')) {
          score += 10;
        }
      } else if (answers.carType === 'Citadine') {
        if (product.type.includes('Sandero') || product.type.includes('Clio') || 
            product.type.includes('208') || product.type.includes('C3') || product.type.includes('Golf')) {
          score += 20;
        }
      } else if (answers.carType === 'SUV') {
        if (product.type.includes('Duster') || product.type.includes('3008') || 
            product.type.includes('Captur') || product.type.includes('C5') ||
            product.type.includes('X3') || product.type.includes('X5') || 
            product.type.includes('Q5') || product.type.includes('GLC') ||
            product.type.includes('Tiguan')) {
          score += 20;
        }
      }
      
      // Bonus carburant (0-20 points)
      if (answers.fuelType && product.fuelType === answers.fuelType) {
        score += 20;
      }
      
      // Bonus rating (0-15 points)
      if (product.rating) {
        score += Math.min(15, product.rating * 3);
      }
      
      // Pénalité si le prix ne correspond pas au budget
      if (answers.budget === 'high' && product.pricePerDay <= 1000) {
        score -= 20;
      } else if (answers.budget === 'low' && product.pricePerDay > 600) {
        score -= 15;
      } else if (answers.budget === 'medium' && (product.pricePerDay < 300 || product.pricePerDay > 1200)) {
        score -= 10;
      }
      
      return {
        ...product.toObject(),
        score: Math.min(100, Math.max(0, Math.round(score)))
      };
    });
    
    // Filtrer pour enlever les voitures qui ne correspondent vraiment pas au budget
    let filteredRecommendations = recommendations;
    if (answers.budget === 'high') {
      filteredRecommendations = recommendations.filter(r => r.pricePerDay > 1000);
      console.log(`💰 Filtrage final: garde uniquement les voitures > 1000 DH (${filteredRecommendations.length} restantes)`);
    } else if (answers.budget === 'low') {
      filteredRecommendations = recommendations.filter(r => r.pricePerDay < 500);
      console.log(`💰 Filtrage final: garde uniquement les voitures < 500 DH (${filteredRecommendations.length} restantes)`);
    } else if (answers.budget === 'medium') {
      filteredRecommendations = recommendations.filter(r => r.pricePerDay >= 500 && r.pricePerDay <= 1000);
      console.log(`💰 Filtrage final: garde uniquement les voitures entre 500-1000 DH (${filteredRecommendations.length} restantes)`);
    }
    
    // S'assurer qu'on a au moins des recommandations
    if (filteredRecommendations.length === 0 && recommendations.length > 0) {
      console.log('⚠️ Aucune voiture après filtrage budget, retour des meilleures scores');
      filteredRecommendations = recommendations;
    }
    
    // Trier par score décroissant
    filteredRecommendations.sort((a, b) => b.score - a.score);
    
    // Garder les 10 meilleures recommandations
    const topRecommendations = filteredRecommendations.slice(0, 10);
    
    console.log(`🏆 Top ${topRecommendations.length} recommandations générées`);
    topRecommendations.forEach((r, i) => {
      console.log(`   ${i+1}. ${r.type}: ${r.pricePerDay} DH (score: ${r.score})`);
    });
    
    // Sauvegarder les réponses du quiz
    const quiz = await Quiz.findOneAndUpdate(
      { userId: req.userId },
      { 
        answers, 
        recommendations: topRecommendations.map(p => p._id),
        createdAt: Date.now() 
      },
      { upsert: true, new: true }
    );
    
    res.json({ 
      message: 'Quiz answers saved', 
      recommendations: topRecommendations 
    });
    
  } catch (error) {
    console.error('❌ Erreur saveQuizAnswers:', error);
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

// Récupérer les recommandations
const getRecommendations = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ userId: req.userId });
    
    if (!quiz) {
      return res.status(404).json({ error: 'No quiz found for this user' });
    }
    
    const recommendations = await Product.find({
      _id: { $in: quiz.recommendations }
    });
    
    // Ajouter les scores aux recommandations
    const recommendationsWithScores = recommendations.map(rec => {
      const savedRec = quiz.recommendationsData || [];
      const savedScore = savedRec.find(r => r._id === rec._id);
      return {
        ...rec.toObject(),
        score: savedScore?.score || 70
      };
    });
    
    res.json(recommendationsWithScores);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveQuizAnswers, getQuizResults, getRecommendations };