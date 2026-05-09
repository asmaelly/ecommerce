import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { HomePageSkeleton } from '../components/Skeletons';
import NavBar from '../components/NavBar';

// Import de vos logos SVG
import logo1 from '../assets/audi.svg';
import logo2 from '../assets/bmw.svg';
import logo3 from '../assets/dacia.svg';
import logo4 from '../assets/ford.svg';
import logo5 from '../assets/hyundai.svg';
import logo6 from '../assets/jeep.svg';
import logo7 from '../assets/kia.svg';
import logo8 from '../assets/mercedes.svg';
import logo9 from '../assets/peugeot.svg';
import logo10 from '../assets/renault.svg';
import logo11 from '../assets/landingphoto.jpg';

// Tableau des logos avec leurs noms
const logos = [
  { src: logo1, name: "Audi" },
  { src: logo2, name: "BMW" },
  { src: logo3, name: "Dacia" },
  { src: logo4, name: "Ford" },
  { src: logo5, name: "Hyundai" },
  { src: logo6, name: "Jeep" },
  { src: logo7, name: "Kia" },
  { src: logo8, name: "Mercedes" },
  { src: logo9, name: "Peugeot" },
  { src: logo10, name: "Renault" },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    brand: '',     // Changé de 'type' à 'brand'
    fuel: '',
    sort: '',
    maxPrice: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProduct();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <HomePageSkeleton />;

  // Fonction pour extraire la marque du nom du véhicule
  const getBrandFromType = (type) => {
    const brands = ['Dacia', 'BMW', 'Peugeot', 'Renault', 'Mercedes', 'Audi', 'Citroen', 'Fiat', 'Volvo', 'Ford', 'Hyundai', 'Jeep', 'Kia'];
    for (const brand of brands) {
      if (type?.toLowerCase().startsWith(brand.toLowerCase())) {
        return brand;
      }
    }
    return type?.split(' ')[0] || type; // Fallback: premier mot
  };

  let filtered = [...products];

  // Marques uniques (basées sur le début du type)
  const carBrands = [...new Set(products.map(p => getBrandFromType(p.type)))].sort();
  const fuelTypes = [...new Set(products.map(p => p.fuelType))];

  // Appliquer les filtres
  if (filters.brand) {
    filtered = filtered.filter(p => getBrandFromType(p.type) === filters.brand);
  }

  if (filters.fuel) {
    filtered = filtered.filter(p => p.fuelType === filters.fuel);
  }

  if (filters.maxPrice && filters.maxPrice !== '') {
    filtered = filtered.filter(p => p.pricePerDay <= parseFloat(filters.maxPrice));
  }

  if (filters.sort === 'asc') {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (filters.sort === 'desc') {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ brand: '', fuel: '', sort: '', maxPrice: '' });
  };

  return (
    <div className="bg-[#F9FAFB] font-sans">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={logo11}
          className="absolute w-full h-full object-cover opacity-80"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-6 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Trouvez votre voiture idéale
          </h1>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Une sélection moderne de véhicules adaptés à vos besoins
          </p>
        </div>
        
        {/* Bouton Découvrir */}
        <div className="absolute bottom-18 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              const carsSection = document.getElementById('cars-section');
              carsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <span className="text-sm font-medium text-white">Découvrir nos véhicules</span>
            <svg className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* SECTION LOGOS PARTENAIRES */}
      <section className="py-16 bg-[#F9FAFB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-medium text-[#111111] mb-2">
              Nos marques partenaires
            </h2>
            <p className="text-[#6B7280] text-sm">
              Découvrez notre sélection de véhicules de qualité
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none"></div>
            
            <div className="overflow-hidden">
              <div className="flex gap-12 w-max animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
                
                {logos.map((logo, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-32 h-20 bg-white rounded-xl shadow-sm border border-[#E5E7EB] flex items-center justify-center p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
                
                {logos.map((logo, index) => (
                  <div 
                    key={`duplicate-${index}`} 
                    className="flex-shrink-0 w-32 h-20 bg-white rounded-xl shadow-sm border border-[#E5E7EB] flex items-center justify-center p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
                
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* FEATURED VEHICULES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium text-[#111111]">
            Véhicules populaires
          </h2>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex gap-6 w-max animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[...products, ...products].slice(0, 10).map((product, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  className="w-full h-40 object-cover"
                  alt={product.type}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-medium text-[#111111]">
                    {product.type}
                  </h3>
                  <div className="flex justify-between text-xs text-[#6B7280]">
                    <span>{product.rating} ★</span>
                    <span className={product.available ? "text-green-600" : "text-red-500"}>
                      {product.available ? "Disponible" : "Indisponible"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#111111]">
                    {product.pricePerDay} DH <span className="text-[#6B7280] text-xs">/ jour</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN PRODUCTS */}
      <section id="cars-section" className="border-t border-[#E5E7EB] pt-12 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center mb-10">
          <h2 className="text-xl font-medium text-[#111111]">
            Nos véhicules ({filtered.length})
          </h2>
          <button
            onClick={() => setOpenFilter(true)}
            className="px-5 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80"
          >
            Filtres
          </button>
        </div>

        {/* Filtre Sidebar */}
        {openFilter && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpenFilter(false)}
          />
        )}

        <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 border-l border-[#E5E7EB]
          transition-transform duration-300
          ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Filtres</h2>
              <button onClick={() => setOpenFilter(false)} className="text-xl">✕</button>
            </div>

            {/* Filtre par Marque - Corrigé */}
            <div className="mb-5">
              <p className="text-xs text-[#6B7280] mb-2">Marque</p>
              <select
                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm"
                value={filters.brand}
                onChange={(e) => updateFilter('brand', e.target.value)}
              >
                <option value="">Toutes les marques</option>
                {carBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Filtre par Carburant */}
            <div className="mb-5">
              <p className="text-xs text-[#6B7280] mb-2">Carburant</p>
              <select
                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm"
                value={filters.fuel}
                onChange={(e) => updateFilter('fuel', e.target.value)}
              >
                <option value="">Tous</option>
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>

            {/* Tri par Prix */}
            <div className="mb-5">
              <p className="text-xs text-[#6B7280] mb-2">Prix</p>
              <select
                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm"
                value={filters.sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
              >
                <option value="">Normal</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>

            {/* Budget max */}
            <div className="mb-6">
              <p className="text-xs text-[#6B7280] mb-2">Budget max (DH)</p>
              <input
                type="number"
                placeholder="Ex: 500"
                className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
              />
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-2 border border-[#E5E7EB] rounded-xl text-sm hover:bg-gray-100"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Grille des produits */}
        <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#6B7280]">Aucun véhicule ne correspond.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition"
              >
                <img
                  src={product.image}
                  className="w-full h-48 object-cover"
                  alt={product.type}
                />
                <div className="p-5">
                  <h3 className="text-lg font-medium text-[#111111]">
                    {product.type}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-3">
                    {product.description?.substring(0, 90)}...
                  </p>
                  <div className="flex justify-between text-sm text-[#6B7280] mb-3">
                    <span>{product.fuelType}</span>
                    <span>{product.rating} ★</span>
                  </div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xl font-medium text-[#111111]">
                      {product.pricePerDay} DH
                    </span>
                    <span className="text-sm text-[#6B7280]">/ jour</span>
                  </div>
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center py-3 bg-[#111111] text-white rounded-full text-sm hover:opacity-80"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-16 border-t border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Réservation rapide", icon: "⚡", desc: "Réservez votre véhicule en quelques clics" },
            { title: "Voitures premium", icon: "🚗", desc: "Une flotte de véhicules récents et entretenus" },
            { title: "Support 24/7", icon: "📞", desc: "Une assistance disponible à tout moment" }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl hover:bg-gray-50 transition">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6B7280]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;