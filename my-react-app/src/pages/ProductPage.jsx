import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api'; // Changé de getProduct à getProductById
import { useCart } from '../context/CartContext';
import { ProductDetailSkeleton } from '../components/Skeletons';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id); // Changé de getProduct à getProductById
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/home'); // Redirection vers home au lieu de /
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => { // Supprimé async car addToCart n'est pas async dans votre contexte
    addToCart(product, quantity); // Passage de l'objet product complet
    // Option: Afficher une notification au lieu d'un alert
    navigate('/cart'); // Redirection vers le panier après ajout
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#5C677D] mb-4">Produit non trouvé</p>
        <button 
          onClick={() => navigate('/home')}
          className="px-6 py-2 bg-[#111111] text-white rounded-full hover:opacity-80"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f7] via-white to-[#e6ecf5] font-sans py-16">
      
      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto px-6 mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-sm text-[#7D8597] hover:text-black transition flex items-center gap-2"
        >
          ← Retour
        </button>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6">
        
        {/* GLASS CARD */}
        <div className="grid md:grid-cols-2 gap-12 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-6 md:p-10">
          
          {/* IMAGE */}
          <div className="flex justify-center items-center">
            <img 
              src={product.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600'} 
              alt={product.type || product.name} 
              className="h-[280px] md:h-[320px] object-contain drop-shadow-xl"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#001233] mb-3 leading-tight">
              {product.type || product.name}
            </h1>
            
            <p className="text-[#7D8597] text-sm mb-2">
              {product.fuelType || 'Premium'} • {product.rating} ★
            </p>
            
            <p className="text-[#5C677D] text-sm mb-6">
              {product.description?.substring(0, 120)}...
            </p>

            <div className="mb-6">
              <span className="text-3xl md:text-4xl font-bold text-[#023E7D]">
                {product.pricePerDay}
              </span>
              <span className="text-[#7D8597] text-sm ml-2">DH / jour</span>
            </div>

            {/* INFO */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#5C677D]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Places — 5</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={product.available ? "text-green-600" : "text-red-500"}>
                  {product.available ? "Disponible immédiatement" : "Indisponible pour le moment"}
                </span>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[#5C677D] text-sm">Quantité</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#023E7D] transition"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#023E7D] transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button 
              onClick={handleAddToCart}
              disabled={!product.available && product.available !== undefined}
              className={`w-full py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                (!product.available && product.available !== undefined)
                  ? 'bg-gray-200 text-[#7D8597] cursor-not-allowed' 
                  : 'bg-[#023E7D] text-white hover:bg-[#0353A4]'
              }`}
            >
              {(!product.available && product.available !== undefined) ? 'Indisponible' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;