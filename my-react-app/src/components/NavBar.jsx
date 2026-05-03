import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartCount =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Drive<span className="text-[#7D8597]">Wise</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <NavItem to="/">Accueil</NavItem>
          <NavItem to="/orders">Commandes</NavItem>
          <NavItem to="/profile">Profil</NavItem>

          {/* Cart */}
          <Link to="/cart" className="relative hover:opacity-80 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-white text-black px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <span className="text-gray-300">
                {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 border border-white/20 rounded-full hover:bg-white/10 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-white/20 rounded-full hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-white text-black rounded-full font-semibold hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-3 text-sm">

          <MobileItem to="/" onClick={() => setOpen(false)}>Accueil</MobileItem>
          <MobileItem to="/orders" onClick={() => setOpen(false)}>Commandes</MobileItem>
          <MobileItem to="/profile" onClick={() => setOpen(false)}>Profil</MobileItem>
          <MobileItem to="/cart" onClick={() => setOpen(false)}>
            Panier ({cartCount})
          </MobileItem>

          {user ? (
            <>
              <div className="text-gray-400 pt-2">{user.username}</div>
              <button
                onClick={handleLogout}
                className="w-full border border-white/20 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileItem to="/login" onClick={() => setOpen(false)}>Login</MobileItem>
              <MobileItem to="/register" onClick={() => setOpen(false)}>Sign up</MobileItem>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

/* Elegant Nav Item */
const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition ${
          isActive
            ? "text-white font-semibold"
            : "text-gray-300 hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

/* Mobile */
const MobileItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-gray-300 hover:text-white transition"
    >
      {children}
    </Link>
  );
};

export default Navbar;