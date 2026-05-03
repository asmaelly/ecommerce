import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Chargement du produit avec ID:', id);
      const response = await getProduct(id);
      console.log('Produit chargé:', response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
      setError(error.response?.data?.message || 'Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      console.log('Ajout au panier:', { productId: product._id, quantity });
      await addToCart(product._id, quantity);
      alert('Produit ajouté au panier !');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Échec de l\'ajout au panier');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/home')} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas.</p>
        <button 
          onClick={() => navigate('/home')} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 transition"
      >
        ← Retour
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image || 'https://via.placeholder.com/500x500?text=Product'} 
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price ? product.price.toFixed(2) : '0.00'}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through ml-3">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ En stock ({product.stock} unités disponibles)</span>
            ) : (
              <span className="text-red-600">✗ Rupture de stock</span>
            )}
          </div>
          
          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantité:</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 text-xl transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 text-xl transition"
                >
                  +
                </button>
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
              product.stock > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;