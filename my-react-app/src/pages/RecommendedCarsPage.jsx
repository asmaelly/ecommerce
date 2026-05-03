// pages/RecommendedCarsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RecommendedCarsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.recommendations) {
      setCars(location.state.recommendations);
      setLoading(false);
    } else {
      // Rediriger vers home si pas de recommandations
      navigate('/home');
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Voitures recommandées pour vous</h1>
      
      {cars.length === 0 ? (
        <p className="text-center text-gray-500">Aucune recommandation disponible</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div key={car._id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={car.image || 'https://via.placeholder.com/400x300'} 
                alt={car.type}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{car.type}</h3>
                <p className="text-gray-600 mb-2">{car.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">{car.pricePerDay} DH/jour</p>
                <button 
                  onClick={() => navigate(`/product/${car._id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedCarsPage;