import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le dropdown au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Style navbar selon scroll
  const navbarBg = isScrolled 
    ? "bg-[#111111]/95 backdrop-blur-md shadow-2xl" 
    : "bg-[#111111]";
  const headerHeight = isScrolled ? "h-16" : "h-20 md:h-24";
  const hoverColor = "hover:text-[#FFD700]";
  const badgeColor = "bg-[#FFD700] text-black font-bold";

  return (
    <header className="w-full sticky top-0 z-50">
      
      {/* Bandeau défilant (marquee) */}
      <div className="bg-[#5C677D] text-black text-[10px] md:text-xs py-2 md:py-2.5 uppercase tracking-[0.2em] font-medium overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="mx-4 md:mx-8"> Location de véhicules premium </span>
          <span className="mx-4 md:mx-8"> Livraison gratuite sur 500 KM</span>
          <span className="mx-4 md:mx-8"> Meilleur rapport qualité/prix</span>
          <span className="mx-4 md:mx-8"> Assurance incluse</span>
          <span className="mx-4 md:mx-8"> 10 agences au Maroc</span>
          <span className="mx-4 md:mx-8"> Location de véhicules premium </span>
          <span className="mx-4 md:mx-8"> Livraison gratuite sur 500 KM</span>
          <span className="mx-4 md:mx-8"> Meilleur rapport qualité/prix</span>
        </div>
      </div>

      {/* Navbar principale */}
      <div className={`${navbarBg} transition-all duration-500 relative border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center ${headerHeight} transition-all duration-500`}>
            
            {/* Logo - gauche */}
            <div className="flex-1 flex items-center justify-start gap-4">
              <button 
                className="md:hidden text-white hover:text-[#FFD700] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <Link to="/" className="group hidden sm:flex items-center">
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">DW</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Logo central - Brand */}
            <div className="flex-[2] md:flex-1 flex justify-center">
              <Link to="/" className="flex flex-col items-center group text-center">
                <span className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-white group-hover:scale-105 transition-all duration-500`}>
                  DRIVE<span className="text-[#FFD700]">WISE</span>
                </span>
                <span className="hidden md:block text-[0.6rem] font-sans tracking-[0.3em] text-[#33415C] mt-1 uppercase font-bold">
                  Premium Car Rental
                </span>
              </Link>
            </div>

            {/* Icônes droite */}
            <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6 text-white">
              
              {/* Cart */}
              <Link to="/cart" className="relative group">
                <div className="relative">
                  <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-8" />
                  </svg>
                  {cartCount > 0 && (
                    <span className={`absolute -top-2 -right-2 ${badgeColor} text-[9px] md:text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center`}>
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* User / Login */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:inline-block text-sm group-hover:text-[#FFD700] transition">
                      {user.username}
                    </span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mon profil
                      </Link>
                      <Link to="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Mes commandes
                      </Link>
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="group">
                  <span className="hidden md:inline-block text-sm border-b border-transparent group-hover:border-[#FFD700] transition-all">Connexion</span>
                  <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#111111]/98 backdrop-blur-2xl border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'}`}>
          <nav className="flex flex-col items-center space-y-6 text-sm font-medium tracking-wider text-gray-300 uppercase">
            <Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Accueil</Link>
            <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Commandes</Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Profil</Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Panier ({cartCount})</Link>
            
            {!user && (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 text-white border border-[#FFD700] px-8 py-2 rounded-full text-sm">
                Connexion
              </Link>
            )}
            
            {user && (
              <button onClick={handleLogout} className="text-red-400 border border-red-400/30 px-8 py-2 rounded-full text-sm">
                Déconnexion
              </button>
            )}
          </nav>
        </div>

        {/* Navigation Desktop - Liens sous la navbar */}
        <nav className="hidden md:flex justify-center space-x-10 pb-4 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
          <Link to="/home" className="hover:text-[#FFD700] transition-colors">Accueil</Link>
          <Link to="/" className="hover:text-[#FFD700] transition-colors">Nos véhicules</Link>
          <Link to="/" className="hover:text-[#FFD700] transition-colors">Offres</Link>
          <Link to="/" className="hover:text-[#FFD700] transition-colors">Nos agences</Link>
          <Link to="/" className="hover:text-[#FFD700] transition-colors">Contact</Link>
        </nav>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;