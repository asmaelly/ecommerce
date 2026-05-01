// backend/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',// Référence à l'utilisateur qui a passé le quiz
    required: true
  },
  answers: {
    type: Object,// Stocke les réponses du quiz sous forme d'objet (ex: { budget: 'high', style: 'modern' })
    required: true
  },
  recommendations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Référence aux produits recommandés basés sur les réponses du quiz
  }],
  createdAt: { // Date de création du quiz
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);