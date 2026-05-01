import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

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
    try {
      await addToCart(product._id, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back
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
            <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ In Stock ({product.stock} units available)</span>
            ) : (
              <span className="text-red-600">✗ Out of Stock</span>
            )}
          </div>
          
          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 text-xl"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 text-xl"
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
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;