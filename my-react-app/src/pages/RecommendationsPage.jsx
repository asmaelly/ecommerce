import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../services/api';

const RecommendationsPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const navigate = useNavigate();

  const messages = [
    { progress: 10, text: 'Analyse de vos préférences...' },
    { progress: 30, text: 'Recherche des voitures disponibles...' },
    { progress: 50, text: 'Comparaison des options...' },
    { progress: 70, text: 'Calcul des meilleures correspondances...' },
    { progress: 90, text: 'Préparation finale...' }
  ];

  useEffect(() => {
    generateRecommendations();
  }, []);

  useEffect(() => {
    const msg = messages.reduce((prev, curr) =>
      progress >= curr.progress ? curr : prev
    , messages[0]);

    setCurrentMessage(msg.text);
  }, [progress]);

  const generateRecommendations = async () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 180);

    try {
      const response = await getRecommendations();

      const recommendations =
        response.data.recommendations || response.data;

      setProgress(100);

      setTimeout(() => {
        navigate('/recommendedCars', {
          state: { recommendations }
        });
      }, 1200);

    } catch (error) {
      console.error(error);
      setProgress(100);

      setTimeout(() => {
        navigate('/home');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-['Manrope'] px-6">

      {/* CARD (STYLE HOME IDENTIQUE) */}
      <div className="bg-white border border-[#ECECEC] rounded-[30px] p-10 w-full max-w-md text-center shadow-sm">

        {/* SPINNER */}
        <div className="w-10 h-10 border-2 border-[#111] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-[#111] mb-2">
          Analyse...
        </h2>

        {/* MESSAGE */}
        <p className="text-sm text-[#6B7280] min-h-[40px]">
          {currentMessage}
        </p>

        {/* PROGRESS */}
        <div className="mt-6">

          <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#111] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-[#9CA3AF] mt-2">
            {Math.round(progress)}%
          </p>

        </div>

      </div>

    </div>
  );
};

export default RecommendationsPage;