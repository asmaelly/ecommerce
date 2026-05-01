import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/orders/new');
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b py-4">
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-blue-600 font-bold">${item.price}</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({cart.items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              <span>${cart.total?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cart.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
          
          <Link to="/" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;