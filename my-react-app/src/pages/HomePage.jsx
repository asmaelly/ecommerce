import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { HomePageSkeleton } from '../components/Skeletons';
import Footer from '../components/Footer';

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
import heroImage from '../assets/landingphoto.jpg';

const logos = [
  { src: logo1, name: 'Audi' },
  { src: logo2, name: 'BMW' },
  { src: logo3, name: 'Dacia' },
  { src: logo4, name: 'Ford' },
  { src: logo5, name: 'Hyundai' },
  { src: logo6, name: 'Jeep' },
  { src: logo7, name: 'Kia' },
  { src: logo8, name: 'Mercedes' },
  { src: logo9, name: 'Peugeot' },
  { src: logo10, name: 'Renault' },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    brand: '',
    fuel: '',
    sort: '',
    maxPrice: '',
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

  const getBrandFromType = (type) => {
    const brands = [
      'Dacia',
      'BMW',
      'Peugeot',
      'Renault',
      'Mercedes',
      'Audi',
      'Citroen',
      'Fiat',
      'Volvo',
      'Ford',
      'Hyundai',
      'Jeep',
      'Kia',
    ];

    for (const brand of brands) {
      if (type?.toLowerCase().startsWith(brand.toLowerCase())) {
        return brand;
      }
    }

    return type?.split(' ')[0] || type;
  };

  let filtered = [...products];

  const carBrands = [
    ...new Set(products.map((p) => getBrandFromType(p.type))),
  ].sort();

  const fuelTypes = [...new Set(products.map((p) => p.fuelType))];

  if (filters.brand) {
    filtered = filtered.filter(
      (p) => getBrandFromType(p.type) === filters.brand
    );
  }

  if (filters.fuel) {
    filtered = filtered.filter((p) => p.fuelType === filters.fuel);
  }

  if (filters.maxPrice) {
    filtered = filtered.filter(
      (p) => p.pricePerDay <= parseFloat(filters.maxPrice)
    );
  }

  if (filters.sort === 'asc') {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }

  if (filters.sort === 'desc') {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      fuel: '',
      sort: '',
      maxPrice: '',
    });
  };

  return (
    <div className="bg-[#F9FAFB] font-['Manrope'] overflow-hidden">

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">

        <img
          src={heroImage}
          alt="Hero"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-12 text-center px-6 ">

          <p className="uppercase tracking-[0.35em] text-[11px] text-white/70 mb-5">
            DriveWise Morocco
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold text-white leading-tight mb-2  ">
            Trouvez votre
            voiture idéale
          </h1>

          <p className="text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            Une plateforme premium de location de voitures modernes
            partout au Maroc.
          </p>

          <button
            onClick={() => {
              const section = document.getElementById('cars-section');
              section?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="px-8 py-4 rounded-full bg-white text-[#111111] text-sm font-medium hover:scale-105 transition duration-300"
          >
            Découvrir les véhicules
          </button>

        </div>

      </section>

      {/* BRANDS */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[0.25em] text-[11px] text-[#9CA3AF] mb-3">
              Marques partenaires
            </p>

            <h2 className="text-3xl font-semibold text-[#111111]">
              Nos constructeurs premium
            </h2>

          </div>

          <div className="overflow-hidden relative">

            <div className="flex gap-8 w-max animate-[scroll_25s_linear_infinite]">

              {[...logos, ...logos].map((logo, index) => (

                <div
                  key={index}
                  className="w-32 h-20 bg-[#FAFAFA] rounded-2xl border border-[#ECECEC]
                  flex items-center justify-center p-5 hover:bg-white hover:shadow-md transition"
                >

                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition"
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>

      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">

          <div>

            <p className="uppercase tracking-[0.35em] text-[11px] text-[#9CA3AF] mb-4">
              DriveWise Collection
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#111111] leading-tight">
              Les véhicules les plus réservés
            </h2>

          </div>

          <p className="text-sm text-[#6B7280] max-w-md leading-relaxed">
            Découvrez notre sélection premium de véhicules modernes.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {products.slice(0, 3).map((product) => (

            <div
              key={product._id}
              className="group bg-white rounded-[30px] overflow-hidden border border-[#ECECEC]
              hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
              transition-all duration-500">

              <div className="relative overflow-hidden h-[240px]">

                <img
                  src={product.image}
                  alt={product.type}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute top-5 left-5">

                  <span className="px-4 py-1.5 rounded-full bg-white/90 text-[11px] uppercase tracking-[0.2em]">
                    Premium
                  </span>

                </div>

                <div className="absolute bottom-5 left-5 text-white">

                  <h3 className="text-2xl font-semibold">
                    {product.type}
                  </h3>

                  <p className="text-white/80 text-sm mt-1">
                    {product.fuelType}
                  </p>

                </div>

              </div>

              <div className="p-6">

                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  {product.description?.substring(0, 90)}...
                </p>

                <div className="flex items-center justify-between">

                  <div>

                    <span className="text-2xl font-semibold text-[#111111]">
                      {product.pricePerDay} DH
                    </span>

                    <span className="text-sm text-[#9CA3AF] ml-1">
                      / jour
                    </span>

                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="px-5 py-3 rounded-full bg-[#111111] text-white text-sm hover:bg-black transition"
                  >
                    Voir détails
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* VEHICULES */}
      <section
        id="cars-section"
        className="bg-white border-t border-[#ECECEC] py-20"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

            <div>

              <p className="uppercase tracking-[0.25em] text-[11px] text-[#9CA3AF] mb-3">
                Catalogue
              </p>

              <h2 className="text-3xl font-semibold text-[#111111]">
                Nos véhicules
              </h2>

            </div>

            <div className="flex items-center gap-4">

              <p className="text-sm text-[#6B7280]">
                {filtered.length} véhicules disponibles
              </p>

              <button
                onClick={() => setOpenFilter(true)}
                className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-sm hover:opacity-80 transition"
              >
                Filtres
              </button>

            </div>

          </div>

          {/* FILTER */}
          {openFilter && (
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpenFilter(false)}
            />
          )}

          <div
            className={`fixed top-0 right-0 h-full w-80 bg-white z-50 border-l border-[#E5E7EB]
            transition-transform duration-300
            ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}
          >

            <div className="p-6">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-xl font-semibold text-[#111111]">
                  Filtres
                </h2>

                <button
                  onClick={() => setOpenFilter(false)}
                  className="text-2xl"
                >
                  ✕
                </button>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-xs text-[#6B7280] mb-2">
                    Marque
                  </p>

                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      updateFilter('brand', e.target.value)
                    }
                    className="w-full border border-[#ECECEC] rounded-2xl px-4 py-3 text-sm outline-none"
                  >

                    <option value="">
                      Toutes les marques
                    </option>

                    {carBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}

                  </select>

                </div>

                <div>

                  <p className="text-xs text-[#6B7280] mb-2">
                    Carburant
                  </p>

                  <select
                    value={filters.fuel}
                    onChange={(e) =>
                      updateFilter('fuel', e.target.value)
                    }
                    className="w-full border border-[#ECECEC] rounded-2xl px-4 py-3 text-sm outline-none"
                  >

                    <option value="">Tous</option>

                    {fuelTypes.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}

                  </select>

                </div>

                <div>

                  <p className="text-xs text-[#6B7280] mb-2">
                    Trier par prix
                  </p>

                  <select
                    value={filters.sort}
                    onChange={(e) =>
                      updateFilter('sort', e.target.value)
                    }
                    className="w-full border border-[#ECECEC] rounded-2xl px-4 py-3 text-sm outline-none"
                  >

                    <option value="">Normal</option>
                    <option value="asc">Prix croissant</option>
                    <option value="desc">Prix décroissant</option>

                  </select>

                </div>

                <div>

                  <p className="text-xs text-[#6B7280] mb-2">
                    Budget max
                  </p>

                  <input
                    type="number"
                    placeholder="500 DH"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      updateFilter('maxPrice', e.target.value)
                    }
                    className="w-full border border-[#ECECEC] rounded-2xl px-4 py-3 text-sm outline-none"
                  />

                </div>

                <button
                  onClick={resetFilters}
                  className="w-full py-3 rounded-2xl bg-[#111111] text-white text-sm hover:opacity-80 transition"
                >
                  Réinitialiser
                </button>

              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

            {filtered.map((product) => (

              <div
                key={product._id}
                className="group bg-[#FAFAFA] rounded-[24px] overflow-hidden border border-transparent
                hover:border-[#ECECEC] hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)]
                transition-all duration-500 max-w-[320px] w-full"
              >

                <div className="overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.type}
                    className="w-full h-[190px] object-cover group-hover:scale-[1.03] transition duration-700"
                  />

                </div>

                <div className="p-5">

                  <div className="flex justify-between items-start mb-4">

                    <div>

                      <h3 className="text-lg font-semibold text-[#111111]">
                        {product.type}
                      </h3>

                      <p className="text-sm text-[#777777] mt-1">
                        {product.fuelType}
                      </p>

                    </div>

                    <span
                      className={`text-[11px] px-3 py-1 rounded-full ${
                        product.available
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {product.available
                        ? 'Disponible'
                        : 'Indisponible'}
                    </span>

                  </div>

                  <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                    {product.description?.substring(0, 80)}...
                  </p>

                  <div className="flex items-center justify-between">

                    <div>

                      <span className="text-xl font-semibold text-[#111111]">
                        {product.pricePerDay} DH
                      </span>

                      <span className="text-sm text-[#9CA3AF] ml-1">
                        / jour
                      </span>

                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="px-4 py-2 rounded-full border border-[#111111]
                      text-sm text-[#111111] hover:bg-[#111111] hover:text-white transition"
                    >
                      Voir détails
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}
     <Footer />

    </div>
  );
};

export default HomePage;