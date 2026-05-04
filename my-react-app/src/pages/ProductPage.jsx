import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
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
      const response = await getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
    alert('Produit ajouté au panier');
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return <div className="text-center py-12 text-[#5C677D]">Produit non trouvé</div>;

  return (
  <div className="h-screen overflow-hidden flex items-center justify-center font-sans
                  bg-gradient-to-br from-[#eef2f7] via-white to-[#e6ecf5]">

    {/* BACK */}
    <button 
      onClick={() => navigate(-1)} 
      className="absolute top-8 left-8 text-sm text-[#7D8597] hover:text-black transition"
    >
      ← Retour
    </button>

    <div className="w-full max-w-5xl px-6">

      {/* GLASS CARD */}
      <div className="grid md:grid-cols-2 items-center gap-12
                      bg-white/40 backdrop-blur-xl
                      border border-white/30
                      rounded-3xl p-10">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600'} 
            alt={product.name} 
            className="h-[320px] object-contain drop-shadow-xl"
          />
        </div>

        {/* CONTENT */}
        <div className="max-w-sm">

          <h1 className="text-4xl font-serif text-[#001233] mb-4 leading-tight">
            {product.type || product.name}
          </h1>

          <p className="text-[#7D8597] text-sm mb-8">
            {product.fuelType || 'Premium'}
          </p>

          <div className="mb-10">
            <span className="text-3xl font-light text-[#023E7D]">
              {product.pricePerDay}
            </span>
            <span className="text-[#7D8597] text-sm ml-2">DH / jour</span>
          </div>

          {/* MINIMAL INFO */}
          <div className="text-sm text-[#5C677D] mb-10 space-y-1">
            <p>Places — 5</p>
            <p>
              {product.stock > 0 ? 'Disponible' : 'Indisponible'}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-6 mb-10 text-lg">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#7D8597] hover:text-black transition"
            >
              −
            </button>

            <span>{quantity}</span>

            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#7D8597] hover:text-black transition"
            >
              +
            </button>
          </div>

          {/* BUTTON */}
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-full text-sm transition-all duration-300 ${
              product.stock === 0 
                ? 'bg-white/30 text-[#7D8597]' 
                : 'bg-[#023E7D] text-white hover:opacity-90'
            }`}
          >
            {product.stock === 0 ? 'Indisponible' : 'Ajouter'}
          </button>

        </div>
      </div>
    </div>
  </div>
);
};

export default ProductPage;