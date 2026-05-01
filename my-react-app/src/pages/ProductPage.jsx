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
    await addToCart(product._id, quantity);
    alert('Product added to cart!');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:text-blue-800">
        ← Back
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="text-gray-500 mb-4">Stock: {product.stock} units</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity:</label>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;