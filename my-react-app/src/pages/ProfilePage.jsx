import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch {
        navigate('/home');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Vérifier si le produit est déjà dans la wishlist
  useEffect(() => {
    if (product && wishlist?.items) {
      const exists = wishlist.items.some(item => item._id === product._id);
      setIsInWishlist(exists);
    }
  }, [product, wishlist]);

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      removeFromWishlist(product._id);
      setIsInWishlist(false);
    } else {
      addToWishlist(product);
      setIsInWishlist(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!product) return null;

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Manrope']">

      <div className="max-w-6xl mx-auto px-8 py-16">

        <button 
          onClick={() => navigate(-1)} 
          className="text-sm mb-8 text-gray-500 hover:text-gray-700 transition flex items-center gap-2"
        >
          ← Retour
        </button>

        <div className="grid grid-cols-2 gap-12">

          {/* IMAGE SECTION */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden relative">
            <img
              src={product.image}
              className="w-full h-[320px] object-cover"
              alt={product.type}
            />
            
            {/* Badge Favoris */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
              aria-label={isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <svg 
                className={`w-6 h-6 transition-all duration-300 ${
                  isInWishlist 
                    ? 'text-red-500 fill-red-500 scale-110' 
                    : 'text-gray-500 fill-none hover:text-red-400'
                }`}
                fill="currentColor" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
          </div>

          {/* INFO SECTION */}
          <div>

            <h1 className="text-3xl font-semibold text-[#111] mb-3">
              {product.type}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm text-gray-500">
                {product.fuelType}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="text-2xl font-bold text-[#111] mb-6">
              {product.pricePerDay} DH <span className="text-sm font-normal text-gray-500">/ jour</span>
            </div>

            {/* Disponibilité */}
            <div className={`mb-6 text-sm font-medium ${product.available ? 'text-green-600' : 'text-red-600'}`}>
              {product.available ? '✓ Disponible à la réservation' : '✗ Non disponible actuellement'}
            </div>

            {/* QUANTITÉ */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-600">Quantité :</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                  disabled={!product.available}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                  disabled={!product.available}
                >
                  +
                </button>
              </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/cart');
                }}
                disabled={!product.available}
                className="flex-1 px-8 py-3 bg-[#111] text-white rounded-full text-sm font-medium hover:bg-[#333] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Ajouter au panier
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isInWishlist
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <svg 
                  className={`w-4 h-4 transition-all ${isInWishlist ? 'fill-red-500' : 'fill-none'}`}
                  fill="currentColor" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                {isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
            </div>

            {/* CARACTÉRISTIQUES DÉTAILLÉES */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-[#111] mb-4 uppercase tracking-wide">
                Caractéristiques du véhicule
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Carburant : {product.fuelType || 'Essence'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Kilométrage illimité</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Assurance tous risques incluse</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Livraison à domicile disponible</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Annulation gratuite 48h à l'avance</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Support client 24/7</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;