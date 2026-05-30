import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import cartIcon from '../assets/cart2.svg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ne pas afficher la navbar sur les pages d'auth
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

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
    setDropdownOpen(false);
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.items?.length || 0;

  // Style navbar selon scroll
  const navbarBg = isScrolled 
    ? "bg-[#111111]/95 backdrop-blur-md shadow-2xl" 
    : "bg-[#111111]";
  const headerHeight = isScrolled ? "h-16" : "h-20 md:h-24";
  const badgeColor = "bg-[#FFD700] text-black font-bold";

  // Fonction pour scroller vers la section des véhicules
  const scrollToCars = () => {
    const carsSection = document.getElementById('cars-section');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="w-full sticky top-0 z-50">
      
      {/* Bandeau défilant (marquee) */}
      <div className="bg-[#FFD700] text-black text-[10px] md:text-xs py-2 md:py-2.5 uppercase tracking-[0.2em] font-medium overflow-hidden whitespace-nowrap font-semibold">
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
            <div className="flex-1 flex items-center justify-start">
              <Link to="/" className="group flex items-center">
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
                <span className="hidden md:block text-[0.6rem] font-sans tracking-[0.3em] text-[#FFD700] mt-1 uppercase font-bold">
                  Premium Car Rental
                </span>
              </Link>
            </div>

            {/* ========== VERSION 1: VISITEUR NON CONNECTÉ ========== */}
            {!user && (
              <div className="flex-1 flex justify-end items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-sm border border-[#FFD700] px-5 py-2 rounded-full hover:bg-[#FFD700] hover:text-black transition-all duration-300 text-white"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm bg-[#FFD700] text-black px-5 py-2 rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* ========== VERSION 2: UTILISATEUR CONNECTÉ ========== */}
            {user && (
              <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
                
                {/* Panier avec icône */}
                <Link to="/cart" className="relative group">
                  <div className="relative">
                    <img 
                      src={cartIcon} 
                      alt="Panier" 
                      className="w-6 h-6 group-hover:scale-105 transition-all duration-500 filter brightness-0 invert"
                    />
                    {cartCount > 0 && (
                      <span className={`absolute -top-2 -right-2 ${badgeColor} text-[9px] md:text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center`}>
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Menu utilisateur avec dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 group"
                  >
                    {/* Avatar / Photo */}
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-black text-sm md:text-base font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {/* Nom d'utilisateur */}
                    <span className="hidden md:inline-block text-sm text-white group-hover:text-[#FFD700] transition font-medium">
                      {user.username}
                    </span>
                    {/* Flèche */}
                    <svg className={`w-4 h-4 text-white transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                      {/* Header avec infos utilisateur */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-lg">
                              {user.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu items */}
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mon profil
                      </Link>
                      
                      <Link to="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Mes commandes
                      </Link>
                      
                      <Link to="/favoris" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Mes favoris 
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                      
                      <hr className="my-1" />
                      
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Desktop - Liens sous la navbar (visible pour tous) */}
        <nav className="hidden md:flex justify-center space-x-10 pb-4 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
          {user && <Link to="/favoris" className="hover:text-[#FFD700] transition-colors">Favoris</Link>}
          <Link to="/cars"  className="hover:text-[#FFD700] transition-colors uppercase">Nos vehicules</Link>
          <Link to="/agencies" className="hover:text-[#FFD700] transition-colors">Nos agences</Link>
          <Link to="/contact" className="hover:text-[#FFD700] transition-colors">Contact</Link>
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