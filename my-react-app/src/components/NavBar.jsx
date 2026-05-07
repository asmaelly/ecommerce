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
    navigate('/');
  };

  const cartCount =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-[#111111]"
        >
          Drive<span className="text-[#6B7280]">Wise</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm">

          <NavItem to="/orders">Commandes</NavItem>
          <NavItem to="/profile">Profil</NavItem>

        </div>

        <div className="hidden md:flex items-center gap-4">

          <Link
            to="/cart"
            className="relative px-4 py-2 border border-[#E5E7EB] rounded-full text-sm hover:bg-[#F9FAFB] transition"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#111111] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <>
              <span className="text-sm text-[#6B7280]">
                {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-[#111111]"
        >
          ☰
        </button>

      </div>

      {open && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-6 py-6 space-y-4">

          <MobileItem to="/" onClick={() => setOpen(false)}>
            Accueil
          </MobileItem>

          <MobileItem to="/orders" onClick={() => setOpen(false)}>
            Commandes
          </MobileItem>

          <MobileItem to="/profile" onClick={() => setOpen(false)}>
            Profil
          </MobileItem>

          <MobileItem to="/cart" onClick={() => setOpen(false)}>
            Cart ({cartCount})
          </MobileItem>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-[#111111] text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition ${
          isActive
            ? 'text-[#111111] font-medium'
            : 'text-[#6B7280] hover:text-[#111111]'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const MobileItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-sm text-[#6B7280] hover:text-[#111111] transition"
    >
      {children}
    </Link>
  );
};

export default Navbar;