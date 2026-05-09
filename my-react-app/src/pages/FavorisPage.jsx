import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CartSkeleton } from '../components/Skeletons'; 
import favEmptyImg from '../assets/fav.svg';

const FavorisPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  // Vérification du chargement
  if (!wishlist) {
    return <CartSkeleton />;
  }

  if (!wishlist.items || wishlist.items.length === 0) {
    return (
      <div className="max-h-screen bg-[#F9FAFB] flex items-center justify-center font-sans py-16">
        <div className="text-center max-w-md mx-auto px-6">
          <img src={favEmptyImg} alt="Favoris vide" className="bg-[#F9FAFB] w-20 h-20 mx-auto mb-6 opacity-80" />
          <h1 className="text-2xl font-bold text-[#111111] mb-4">Aucun favoris</h1>
          <p className="text-[#6B7280] mb-8">
            Vous n'avez pas encore ajouté de véhicules à vos favoris.
          </p>
          <Link 
            to="/home" 
            className="inline-block px-6 py-3 bg-[#FBBF24] text-white rounded-full hover:opacity-80 hover:shadow hover:bg-[#F59E0B] transition"
          >
            Découvrir nos véhicules
          </Link>
        </div>
      </div>
    );
  }

  const itemCount = wishlist.items.length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111111] mb-8">
          Mes favoris ({itemCount} {itemCount > 1 ? 'articles' : 'article'})
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des favoris */}
          <div className="lg:col-span-2 space-y-4">
            {wishlist.items.map((item) => (
              <div key={item.productId} className="bg-white rounded-2xl border border-[#E5E7EB] p-4 hover:shadow-md transition">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-8" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Infos produit */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#111111]">{item.name}</h3>
                    <p className="text-sm text-[#6B7280] mb-2">{item.fuelType || 'Essence'}</p>
                    <p className="text-smart-blue font-bold text-lg">{item.price} DH / jour</p>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80 transition font-medium"
                      >
                        Ajouter au panier
                      </button>
                      <button 
                        onClick={() => handleRemoveFromWishlist(item.productId)}
                        className="text-red-500 hover:text-red-700 text-sm transition flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer
                      </button>
                    </div>
                  </div>
                  
                  {/* Prix total (pas pertinent pour favoris, mais gardé pour cohérence) */}
                  <div className="text-right">
                    <Link 
                      to={`/product/${item.productId}`}
                      className="text-sm text-[#6B7280] hover:text-[#111111] transition"
                    >
                      Voir détails →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Résumé - Version desktop */}
          <div className="hidden lg:block bg-white rounded-2xl border border-[#E5E7EB] p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-[#111111] mb-4">Récapitulatif</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-[#6B7280]">
                <span>Total favoris</span>
                <span className="font-semibold text-[#111111]">{itemCount} véhicule{itemCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Prix moyen</span>
                <span className="font-semibold text-[#111111]">
                  {(wishlist.items.reduce((sum, item) => sum + item.price, 0) / itemCount || 0).toFixed(0)} DH
                </span>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3 mt-3">
                <p className="text-sm text-[#6B7280] text-center">
                  Ajoutez vos véhicules favoris au panier pour finaliser votre commande
                </p>
              </div>
            </div>
            
            <Link 
              to="/home" 
              className="block text-center w-full bg-[#111111] text-white py-3 rounded-full hover:opacity-80 transition font-medium"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>

        {/* Résumé - Version mobile (en bas de page) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 shadow-lg z-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B7280] text-sm">Mes favoris</span>
            <span className="text-xl font-bold text-smart-blue">{itemCount} véhicule{itemCount > 1 ? 's' : ''}</span>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/home" 
              className="flex-1 text-center py-3 bg-[#111111] text-white rounded-full hover:opacity-80 transition font-medium text-sm"
            >
              Explorer
            </Link>
            <button 
              onClick={() => {
                // Ajouter tous les favoris au panier
                wishlist.items.forEach(item => addToCart(item, 1));
                navigate('/cart');
              }}
              className="flex-1 text-center py-3 border border-[#FBBF24] text-[#FBBF24] rounded-full text-sm hover:bg-[#FBBF24] hover:text-white transition"
            >
              Tout ajouter
            </button>
          </div>
        </div>

        {/* Espace en bas pour le footer mobile */}
        <div className="lg:hidden h-28" />
      </div>
    </div>
  );
};

export default FavorisPage;