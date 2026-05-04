import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { HomePageSkeleton } from '../components/Skeletons';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
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

  let filtered = [...products];

  // Get unique values dynamically from products data
  const carTypes = [...new Set(products.map(p => p.type))];
  const fuelTypes = [...new Set(products.map(p => p.fuelType))];
  
  // Apply filters
  if (filters.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }

  if (filters.fuel) {
    filtered = filtered.filter(p => p.fuelType === filters.fuel);
  }

  if (filters.maxPrice && filters.maxPrice !== '') {
    filtered = filtered.filter(p => p.pricePerDay <= parseFloat(filters.maxPrice));
  }

  // Apply sorting
  if (filters.sort === 'asc') {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (filters.sort === 'desc') {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  // Reset filters function
  const resetFilters = () => {
    setFilters({ type: '', fuel: '', sort: '', maxPrice: '' });
  };

  // Update filter handler
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans relative">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-medium text-[#111111]">
          Nos véhicules ({filtered.length})
        </h1>

        <button
          onClick={() => setOpenFilter(true)}
          className="px-5 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80"
        >
          Filtres
        </button>
      </div>

      {/* OVERLAY */}
      {openFilter && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpenFilter(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 border-l border-[#E5E7EB]
        transition-transform duration-300
        ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Filtres</h2>
            <button onClick={() => setOpenFilter(false)} className="text-xl">✕</button>
          </div>

          {/* TYPE - Dynamic options */}
          <div className="mb-5">
            <p className="text-xs text-[#6B7280] mb-2">Type voiture</p>
            <select
              className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm"
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value)}
            >
              <option value="">Tous</option>
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* FUEL - Dynamic options */}
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

          {/* SORT */}
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

          {/* MAX PRICE */}
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

          {/* RESET */}
          <button
            onClick={resetFilters}
            className="w-full py-2 border border-[#E5E7EB] rounded-xl text-sm hover:bg-gray-100"
          >
            Réinitialiser
          </button>

        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B7280]">Aucun véhicule ne correspond à vos critères.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-md transition"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;