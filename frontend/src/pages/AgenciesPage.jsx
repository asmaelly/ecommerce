import React, { useState, useEffect } from 'react';
import { getAgencies } from '../services/api';
import Footer from '../components/Footer';
import agencyImg from "../assets/agencyImg.jpeg";

const AgenciesPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('all');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await getAgencies();

      setAgencies(response.data);

      const uniqueCities = [
        ...new Set(response.data.map((a) => a.city))
      ];

      setCities(uniqueCities);

    } catch (error) {
      console.error('Erreur lors du chargement des agences:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgencies =
    selectedCity === 'all'
      ? agencies
      : agencies.filter((a) => a.city === selectedCity);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">

      {/* CONTENT */}
      <div className="flex-1 w-full py-10">

        <div className="max-w-4xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-16 text-left">

            <h1 className="text-5xl font-['Clash_Display'] text-[#111111] mb-4">
              Nos Agences
            </h1>

            <p className="text-[#6B7280] text-sm leading-relaxed">
              Découvrez les agences DriveWise au Maroc.
            </p>

          </div>

          {/* FILTER */}
          <div className="flex flex-wrap gap-2 mb-8">

            <button
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-1.5 rounded-full text-xs border transition ${
                selectedCity === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              Toutes
            </button>

            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs border transition ${
                  selectedCity === city
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-[#E5E7EB] text-[#6B7280]'
                } hover:bg-black hover:text-white hover:border-black`}
              >
                {city}
              </button>
            ))}

          </div>

          {/* AGENCIES */}
          <div className="space-y-4">

            {filteredAgencies.map((agency) => (

              <div
                key={agency._id}
                className="w-full bg-white rounded-2xl border border-[#F1F1F1] p-3 shadow-sm hover:shadow-md transition-all duration-300"
              >

                <div className="flex flex-col md:flex-row gap-4">

                  {/* IMAGE */}
                  <div className="relative w-full md:w-[180px] h-[140px] rounded-xl overflow-hidden flex-shrink-0">

                    {/* BUTTON */}
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${agency.coordinates.lat},${agency.coordinates.lng}`,
                          '_blank'
                        )
                      }
                      className="absolute top-3 left-3 z-10 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] hover:bg-black transition"
                    >
                      Voir l’itinéraire
                    </button>

                    {/* IMAGE */}
                    <img
                      src={agencyImg}
                      alt={agency.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-lg font-semibold text-[#111111] mb-2">
                        {agency.name}
                      </h2>

                      <div className="inline-block px-2.5 py-1 bg-[#F9FAFB] rounded-full text-[11px] text-[#6B7280] border border-[#ECECEC] mb-4">
                        {agency.city}
                      </div>

                      <div className="space-y-2">

                        {/* ADDRESS */}
                        <div className="bg-[#FAFAFA] rounded-xl px-3 py-2 border border-[#F1F1F1]">

                          <p className="text-[10px] uppercase text-[#9CA3AF] tracking-wide mb-1">
                            Adresse
                          </p>

                          <p className="text-xs text-[#111111] leading-relaxed">
                            {agency.address}
                          </p>

                        </div>

                        {/* INFOS */}
                        <div className="grid grid-cols-2 gap-2">

                          <div className="bg-[#FAFAFA] rounded-xl px-3 py-2 border border-[#F1F1F1]">

                            <p className="text-[10px] uppercase text-[#9CA3AF] tracking-wide mb-1">
                              Téléphone
                            </p>

                            <p className="text-xs text-[#111111]">
                              {agency.phone}
                            </p>

                          </div>

                          <div className="bg-[#FAFAFA] rounded-xl px-3 py-2 border border-[#F1F1F1]">

                            <p className="text-[10px] uppercase text-[#9CA3AF] tracking-wide mb-1">
                              Véhicules
                            </p>

                            <p className="text-xs text-[#111111]">
                              {agency.availableCars} disponibles
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>

            ))}

          </div>

          {/* EMPTY */}
          {filteredAgencies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[#6B7280]">
                Aucune agence trouvée.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="w-full mt-10">
        <Footer />
      </div>

    </div>
  );
};

export default AgenciesPage;