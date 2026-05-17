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
      title: 'Budget',
      question: 'Quel est ton budget pour la location par jour ?',
      explanation:
        'Choisissez le budget qui correspond le mieux à vos besoins.',
      options: [
        {
          value: 'Moins de 500 DH',
          example: 'Économique & accessible'
        },
        {
          value: '500 DH - 1000 DH',
          example: 'Confort & équilibre'
        },
        {
          value: 'Plus de 1000 DH',
          example: 'Premium & luxe'
        }
      ]
    },
    {
      id: 'carType',
      title: 'Type de voiture',
      question: 'Quel type de voiture préfères-tu ?',
      explanation:
        'Sélectionnez le style de véhicule qui vous convient.',

      options: [
        {
          value: 'Citadine',
          example: 'Clio • 208 • Sandero'
        },
        {
          value: 'SUV',
          example: 'Duster • Captur • 3008'
        },
        {
          value: 'Berline',
          example: 'BMW Série 3 • Tesla'
        }
      ]
    },
    {
      id: 'fuelType',
      title: 'Carburant',
      question: 'Quel type de carburant préfères-tu ?',
      explanation:
        'Choisissez votre motorisation préférée.',

      options: [
        {
          value: 'Essence',
          example: 'Flexible & pratique'
        },
        {
          value: 'Diesel',
          example: 'Longs trajets'
        },
        {
          value: 'Hybride',
          example: 'Économie & confort'
        },
        {
          value: 'Électrique',
          example: 'Silencieux & moderne'
        }
      ]
    }
  ];

  const currentQ = quizQuestions[currentQuestion];

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQ.id]: value
    });
  };

  const handleNext = async () => {
    if (!answers[currentQ.id]) return;

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);

      try {
        await saveQuizAnswers(answers);

        completeQuiz();
        navigate('/recommendations');
      } catch (error) {
        console.error(error);

        localStorage.setItem('quizCompleted', 'true');
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        localStorage.setItem('isNewUser', 'false');

        completeQuiz();
        navigate('/home');
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress =
    ((currentQuestion + 1) / quizQuestions.length) * 100;

  

 return (
  <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 font-['Manrope']">

    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE (TITLE / INFO) */}
      <div className="space-y-6">

        <div>
          <p className="uppercase tracking-[0.35em] text-[10px] text-[#9CA3AF] mb-3">
            DriveWise Recommendation
          </p>

          <h1 className="text-5xl font-semibold text-[#111111] leading-tight">
            Find your perfect car
          </h1>

          <p className="text-[#6B7280] text-sm mt-4 leading-relaxed max-w-md">
            Answer a few simple questions and we’ll recommend the best vehicles
            based on your budget, style, and preferences.
          </p>
        </div>

        {/* progress mini (optional left info) */}
        <div className="hidden lg:block text-sm text-[#9CA3AF]">
          Question {currentQuestion + 1} / {quizQuestions.length}
        </div>

      </div>

      {/* RIGHT SIDE (CARD) */}
      <div className="w-full">

        <div className="bg-white border border-[#ECECEC] rounded-[28px] shadow-sm overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 border-b border-[#F3F4F6]">

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#6B7280]">
                {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>

            <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#111111] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-6">

            {/* QUESTION */}
            <div className="mb-6">

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF] mb-3">
                {currentQ.title}
              </p>

              <h2 className="text-xl font-semibold text-[#111111] mb-2">
                {currentQ.question}
              </h2>

              <p className="text-sm text-[#6B7280]">
                {currentQ.explanation}
              </p>

            </div>

            {/* OPTIONS */}
            <div className="space-y-3">

              {currentQ.options.map((option) => {
                const isSelected = answers[currentQ.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left rounded-2xl border px-4 py-4 transition ${
                      isSelected
                        ? 'bg-[#111111] border-[#111111] text-white'
                        : 'bg-white border-[#ECECEC] hover:border-[#111111]'
                    }`}
                  >
                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="text-sm font-medium">
                          {option.value}
                        </h3>

                        <p className={`text-xs mt-1 ${
                          isSelected ? 'text-white/70' : 'text-[#9CA3AF]'
                        }`}>
                          {option.example}
                        </p>
                      </div>

                      <div className={`w-4 h-4 rounded-full border ${
                        isSelected ? 'bg-white border-white' : 'border-[#D1D5DB]'
                      }`} />

                    </div>
                  </button>
                );
              })}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`flex-1 py-3 rounded-full text-sm ${
                  currentQuestion === 0
                    ? 'bg-[#F3F4F6] text-[#9CA3AF]'
                    : 'border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className={`flex-1 py-3 rounded-full text-sm ${
                  !answers[currentQ.id]
                    ? 'bg-[#E5E7EB] text-[#9CA3AF]'
                    : 'bg-[#111111] text-white hover:opacity-90'
                }`}
              >
                {currentQuestion + 1 === quizQuestions.length
                  ? 'Finish'
                  : 'Next'}
              </button>

            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
);
};

export default QuizPage;