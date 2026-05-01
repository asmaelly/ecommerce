import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveQuizAnswers } from '../services/api';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    budget: '',
    shoppingFrequency: '',
    interests: [],
    receiveEmails: false
  });
  const [loading, setLoading] = useState(false);
  const { completeQuiz } = useAuth();
  const navigate = useNavigate();

  const questions = [
    {
      id: 'budget',
      question: 'What is your budget for shopping?',
      description: 'This helps us show you products in your price range',
      type: 'radio',
      options: [
        { value: 'low', label: 'Under $100', icon: '💰', color: 'bg-green-100' },
        { value: 'medium', label: '$100 - $500', icon: '💳', color: 'bg-blue-100' },
        { value: 'high', label: 'Over $500', icon: '💎', color: 'bg-purple-100' }
      ]
    },
    {
      id: 'shoppingFrequency',
      question: 'How often do you shop online?',
      description: 'We\'ll personalize your experience based on your shopping habits',
      type: 'radio',
      options: [
        { value: 'rarely', label: 'Rarely', icon: '📅' },
        { value: 'monthly', label: 'Monthly', icon: '📆' },
        { value: 'weekly', label: 'Weekly', icon: '📊' },
        { value: 'daily', label: 'Daily', icon: '🔥' }
      ]
    },
    {
      id: 'interests',
      question: 'What are you interested in?',
      description: 'Select all that apply to get personalized recommendations',
      type: 'checkbox',
      options: [
        { value: 'electronics', label: 'Electronics', icon: '💻' },
        { value: 'fashion', label: 'Fashion', icon: '👕' },
        { value: 'home', label: 'Home & Garden', icon: '🏠' },
        { value: 'sports', label: 'Sports', icon: '⚽' },
        { value: 'books', label: 'Books', icon: '📚' },
        { value: 'beauty', label: 'Beauty', icon: '💄' },
        { value: 'toys', label: 'Toys & Games', icon: '🎮' },
        { value: 'automotive', label: 'Automotive', icon: '🚗' }
      ]
    },
    {
      id: 'receiveEmails',
      question: 'Stay updated with exclusive offers?',
      description: 'Get personalized deals and new product alerts',
      type: 'radio',
      options: [
        { value: true, label: 'Yes, send me offers!', icon: '📧' },
        { value: false, label: 'No, thanks', icon: '🔕' }
      ]
    }
  ];

  const handleRadioChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (value, checked) => {
    setAnswers(prev => {
      const newInterests = checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value);
      return { ...prev, interests: newInterests };
    });
  };

  const handleNext = () => {
    // Validate current question
    const currentQ = questions[currentQuestion];
    if (currentQ.type === 'radio' && !answers[currentQ.id]) {
      alert('Please select an option before continuing');
      return;
    }
    if (currentQ.id === 'interests' && answers.interests.length === 0) {
      alert('Please select at least one interest');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
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
    try {
      await saveQuizAnswers(answers);
      completeQuiz();
      navigate('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz answers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with progress */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome! Let's personalize your experience</h1>
          <p className="text-blue-100">Help us understand your preferences</p>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
            {currentQ.description && (
              <p className="text-gray-600">{currentQ.description}</p>
            )}
          </div>

          <div className="space-y-3 mb-8">
            {currentQ.type === 'radio' && currentQ.options.map((option) => (
              <label 
                key={option.value} 
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                  answers[currentQ.id] === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={answers[currentQ.id] === option.value}
                  onChange={(e) => handleRadioChange(currentQ.id, e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-lg mr-2">{option.icon}</span>
                <span className="text-gray-700 flex-1">{option.label}</span>
                {answers[currentQ.id] === option.value && (
                  <span className="text-blue-600 text-xl">✓</span>
                )}
              </label>
            ))}

            {currentQ.type === 'checkbox' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQ.options.map((option) => (
                  <label 
                    key={option.value} 
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      answers.interests.includes(option.value) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={answers.interests.includes(option.value)}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      className="mr-3 w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-lg mr-2">{option.icon}</span>
                    <span className="text-gray-700 flex-1">{option.label}</span>
                    {answers.interests.includes(option.value) && (
                      <span className="text-blue-600 text-xl">✓</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                currentQuestion === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition flex-1 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                isLastQuestion ? 'Submit →' : 'Next →'
              )}
            </button>
          </div>
        </div>

        {/* Skip option (optional) */}
        {currentQuestion === 0 && (
          <div className="px-6 pb-6 text-center">
            <button
              onClick={handleSubmit}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              Skip quiz for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;