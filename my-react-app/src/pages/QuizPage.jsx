import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveQuizAnswers } from '../services/api';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    budget: '',
    carType: '',
    fuelType: '',
    usage: '',
    features: []
  });
  const [loading, setLoading] = useState(false);
  const { completeQuiz } = useAuth();
  const navigate = useNavigate();

  const quizQuestions = [
    {
      id: 'budget',
      question: 'Quel est ton budget pour la location par jour ?',
      description: 'Cela nous aide à te proposer les meilleures offres',
      type: 'radio',
      options: [
        { value: 'low', label: 'Moins de 500 DH', range: '<500', maxPrice: 500 },
        { value: 'medium', label: '500 DH - 1000 DH', range: '500-1000', minPrice: 500, maxPrice: 1000 },
        { value: 'high', label: 'Plus de 1000 DH', range: '>1000', minPrice: 1000 }
      ]
    },
    {
      id: 'carType',
      question: 'Quel type de voiture préfères-tu ?',
      description: 'Choisis ta catégorie de véhicule préférée',
      type: 'radio',
      options: [
        { value: 'Citadine', label: 'Citadine', example: 'Dacia Sandero, Renault Clio, Peugeot 208' },
        { value: 'SUV', label: 'SUV / Familiale', example: 'Dacia Duster, Peugeot 3008, Renault Captur' },
        { value: 'Berline', label: 'Berline / Premium', example: 'Peugeot 508, Renault Talisman, BMW Série 3' },
        { value: 'Utilitaire', label: 'Utilitaire / Polyvalent', example: 'Citroën Berlingo' }
      ]
    },
    {
      id: 'fuelType',
      question: 'Quel type de carburant préfères-tu ?',
      description: 'Pour un choix plus écologique ou économique',
      type: 'radio',
      options: [
        { value: 'Essence', label: 'Essence', example: 'Économique et disponible partout' },
        { value: 'Diesel', label: 'Diesel', example: 'Idéal pour les longs trajets' },
        { value: 'Hybride', label: 'Hybride', example: 'Écologique et économique' },
        { value: 'Électrique', label: 'Électrique', example: 'Zéro émission, très économique' }
      ]
    },
    {
      id: 'usage',
      question: 'Pour quel usage principal ?',
      description: 'Nous adapterons nos suggestions selon ton besoin',
      type: 'radio',
      options: [
        { value: 'daily', label: 'Quotidien / Déplacements', example: 'Travail, courses, ville' },
        { value: 'vacation', label: 'Vacances / Loisirs', example: 'Voyages, week-ends' },
        { value: 'business', label: 'Professionnel', example: 'Réunions, longs trajets' }
      ]
    },
    {
      id: 'features',
      question: 'Quelles options sont importantes pour toi ?',
      description: 'Sélectionne toutes les options qui comptent (plusieurs choix possibles)',
      type: 'checkbox',
      options: [
        { value: 'gps', label: 'GPS intégré' },
        { value: 'bluetooth', label: 'Bluetooth / Audio' },
        { value: 'climatisation', label: 'Climatisation automatique' },
        { value: 'toit_ouvrant', label: 'Toit ouvrant' },
        { value: 'sieges_cuir', label: 'Sièges en cuir' }
      ]
    }
  ];

  const handleRadioChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (value, checked) => {
    setAnswers(prev => {
      const newFeatures = checked
        ? [...prev.features, value]
        : prev.features.filter(f => f !== value);
      return { ...prev, features: newFeatures };
    });
  };

  const handleNext = () => {
    const currentQ = quizQuestions[currentQuestion];
    
    // Validation
    if (currentQ.type === 'radio' && !answers[currentQ.id]) {
      alert('Veuillez sélectionner une réponse');
      return;
    }
    
    if (currentQ.type === 'checkbox' && answers.features.length === 0) {
      alert('Veuillez sélectionner au moins une option');
      return;
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log('Envoi des réponses:', answers);
    
    try {
      const response = await saveQuizAnswers(answers);
      console.log('Quiz sauvegardé avec succès:', response.data);
      
      // Marquer le quiz comme complété
      completeQuiz();
      
      // Rediriger vers la page de recommandations
      navigate('/recommendations');
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du quiz:', error);
      
      let errorMessage = 'Erreur lors de la sauvegarde du quiz.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Erreur: ${errorMessage}\n\nVeuillez réessayer.`);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Obtenir l'exemple pour la question courante
  const getExampleText = () => {
    if (currentQ.options && currentQ.options[0]?.example) {
      const selectedOption = currentQ.options.find(opt => opt.value === answers[currentQ.id]);
      if (selectedOption?.example) {
        return <p className="text-sm text-blue-600 mt-1">{selectedOption.example}</p>;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} sur {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Titre et description */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
        <p className="text-gray-600 mb-6">{currentQ.description}</p>
        
        {/* Exemple si disponible */}
        {getExampleText()}

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQ.type === 'radio' && currentQ.options.map((option) => (
            <label 
              key={option.value} 
              className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                answers[currentQ.id] === option.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center flex-1">
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={answers[currentQ.id] === option.value}
                  onChange={(e) => handleRadioChange(currentQ.id, e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <div>
                  <span className="text-gray-700 font-medium">{option.label}</span>
                  {option.range && (
                    <span className="text-gray-500 text-sm ml-2">({option.range} DH)</span>
                  )}
                </div>
              </div>
              {option.example && !option.range && (
                <span className="text-xs text-gray-400 hidden md:block">{option.example}</span>
              )}
            </label>
          ))}

          {currentQ.type === 'checkbox' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.options.map((option) => (
                <label 
                  key={option.value} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    answers.features.includes(option.value) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={answers.features.includes(option.value)}
                    onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                    className="mr-3 w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
          >
            ← Précédent
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : (
              currentQuestion === quizQuestions.length - 1 ? 'Terminer →' : 'Suivant →'
            )}
          </button>
        </div>

        {/* Indicateur de progression textuel */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Question {currentQuestion + 1} sur {quizQuestions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;