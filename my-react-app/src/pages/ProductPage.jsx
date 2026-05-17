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

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return null;

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Manrope']">

      <div className="max-w-5xl mx-auto px-6 py-16">

        <button onClick={() => navigate(-1)} className="text-sm mb-6 text-gray-500">
          ← Retour
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* IMAGE */}
          <div className="bg-white rounded-2xl border overflow-hidden relative">
            <img
              src={product.image}
              className="w-full h-[220px] object-cover"
              alt={product.type}
            />
            
            {/* Badge Favoris sur l'image */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-105 transition-transform"
              aria-label={isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <svg 
                className={`w-5 h-5 transition-colors ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600 fill-none'}`}
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

          {/* INFO */}
          <div>

            <h1 className="text-2xl font-semibold text-[#111] mb-2">
              {product.type}
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              {product.fuelType} • {product.rating} ★
            </p>

            <p className="text-sm text-gray-500 mb-4">
              {product.description}
            </p>

            <div className="text-xl font-semibold mb-4">
              {product.pricePerDay} DH / jour
            </div>

            {/* Disponibilité */}
            <div className={`mb-4 text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
              {product.available ? '✓ Disponible' : '✗ Non disponible'}
            </div>

            {/* QTY */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                disabled={!product.available}
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                disabled={!product.available}
              >
                +
              </button>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/cart');
                }}
                disabled={!product.available}
                className="flex-1 px-6 py-3 bg-[#111] text-white rounded-full text-sm hover:bg-[#333] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Ajouter au panier
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`px-6 py-3 rounded-full text-sm transition flex items-center gap-2 ${
                  isInWishlist
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <svg 
                  className={`w-4 h-4 ${isInWishlist ? 'fill-red-500' : 'fill-none'}`}
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

            {/* Caractéristiques supplémentaires */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-[#111] mb-3">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{product.fuelType || 'Essence'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Kilométrage illimité</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Assurance incluse</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Livraison disponible</span>
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