import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveQuizAnswers } from '../services/api';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const { completeQuiz } = useAuth();
  const navigate = useNavigate();

  const quizQuestions = [
    {
      id: 'budget',
      question: 'Quel est ton budget pour la location par jour ?',
      options: [
        { value: 'low', label: 'Moins de 500 DH' },
        { value: 'medium', label: '500 DH - 1000 DH' },
        { value: 'high', label: 'Plus de 1000 DH' }
      ]
    },
    {
      id: 'carType',
      question: 'Quel type de voiture préfères-tu ?',
      options: [
        { value: 'Citadine', label: 'Citadine' },
        { value: 'SUV', label: 'SUV / Familiale' },
        { value: 'Berline', label: 'Berline / Premium' }
      ]
    },
    {
      id: 'fuelType',
      question: 'Quel type de carburant préfères-tu ?',
      options: [
        { value: 'Essence', label: 'Essence' },
        { value: 'Diesel', label: 'Diesel' },
        { value: 'Hybride', label: 'Hybride' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const currentQ = quizQuestions[currentQuestion];
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
    
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      await saveQuizAnswers(answers);
      completeQuiz();
      navigate('/home');
    } catch (error) {
      console.error('Quiz error:', error);
      // Fallback - sauvegarde locale
      localStorage.setItem('quizCompleted', 'true');
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      localStorage.setItem('isNewUser', 'false');
      completeQuiz();
      navigate('/home');
    }
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Enregistrement de vos réponses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} sur {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8">{currentQ.question}</h2>

        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
            >
              <span className="text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;