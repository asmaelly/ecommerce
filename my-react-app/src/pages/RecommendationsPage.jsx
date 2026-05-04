import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../services/api';

const RecommendationsPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const navigate = useNavigate();

  const messages = [
    { progress: 10, text: "Analyse de vos préférences..." },
    { progress: 30, text: "Recherche des voitures disponibles..." },
    { progress: 50, text: "Comparaison des prix et options..." },
    { progress: 70, text: "Calcul des meilleures correspondances..." },
    { progress: 90, text: "Préparation de vos recommandations..." }
  ];

  useEffect(() => {
    generateRecommendations();
  }, []);

  useEffect(() => {
    // Mettre à jour le message selon la progression
    const currentMsg = messages.reduce((prev, curr) => 
      progress >= curr.progress ? curr : prev
    , messages[0]);
    setCurrentMessage(currentMsg.text);
  }, [progress]);

  const generateRecommendations = async () => {
    // Simuler la progression
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    try {
      // Appel API pour récupérer les recommandations
      const response = await getRecommendations();
      console.log('Recommandations reçues:', response.data);
      
      setProgress(100);
      
      // ✅ CORRECTION ICI : response.data contient directement le tableau des recommandations
      // ou response.data.recommendations selon la structure de votre API
      const recommendations = response.data.recommendations || response.data;
      
      // Rediriger vers la page des résultats après 1 seconde
      setTimeout(() => {
        navigate('/recommendedCars', { 
          state: { recommendations: recommendations }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la génération des recommandations:', error);
      setProgress(100);
      setTimeout(() => {
        navigate('/home'); // Redirection en cas d'erreur
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        {/* Animation de chargement */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Génération de vos recommandations
        </h2>
        
        {/* Message dynamique */}
        <p className="text-gray-600 mb-6 min-h-[60px]">
          {currentMessage}
        </p>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {Math.round(progress)}% complété
          </p>
        </div>

        {/* Points animés */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;