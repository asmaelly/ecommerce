import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">E-Commerce Store</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/orders" className="hover:text-gray-300">Orders</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/cart" className="hover:text-gray-300 relative">
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;