import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const { cart, loadCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createOrder(formData);
      await loadCart(); // Refresh cart (should be empty)
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Shipping Address</label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Placing Order...' : `Place Order - $${cart.total?.toFixed(2)}`}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cart.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;