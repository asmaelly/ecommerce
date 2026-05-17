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
      navigate('/home');
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-['Manrope']">
        <div className="w-8 h-8 border border-[#111] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaebec] font-['Manrope']">

      {/* HEADER MINIMAL */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

        <button
          onClick={() => navigate('/home')}
          className="text-sm text-[#6B7280] hover:text-[#111] transition"
        >
          ← Home
        </button>

        <p className="text-xs tracking-[0.35em] text-[#9CA3AF] uppercase">
          Recommendations
        </p>

        <div></div>
      </div>

      {/* TITLE */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <h1 className="text-3xl font-semibold text-[#111]">
          Recommendations
        </h1>
        <p className="text-sm text-[#6B7280] mt-2">
          Voitures selectiones daprs votre preferences et besoins.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">

        {cars.map((car, index) => (
          <div
            key={car._id || index}
            className="group bg-white border border-[#ECECEC] rounded-[22px] overflow-hidden
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition duration-500"
          >

            {/* IMAGE */}
            <div className="h-[170px] bg-[#F5F5F5] overflow-hidden">
              <img
                src={car.image || 'https://via.placeholder.com/400x300'}
                alt={car.type}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h3 className="text-base font-medium text-[#111]">
                {car.type}
              </h3>

              <p className="text-xs text-[#9CA3AF] mt-1">
                {car.fuelType}
              </p>

              {/* PRICE */}
              <div className="mt-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-[#111]">
                  {car.pricePerDay} DH
                  <span className="text-[#9CA3AF] font-normal"> /day</span>
                </span>

                <button
                  onClick={() => navigate(`/product/${car._id}`)}
                  className="text-xs px-4 py-2 rounded-full border border-[#111]
                  hover:bg-[#111] hover:text-white transition"
                >
                  View
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RecommendedCarsPage;