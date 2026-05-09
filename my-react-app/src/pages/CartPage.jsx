import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartSkeleton } from '../components/Skeletons'; 
import cartEmptyImg from '../assets/cart.svg'; 

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
    navigate('/checkout');
  };

  // Calcul du total
  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Vérification du chargement
  if (!cart) {
    return <CartSkeleton />;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-h-screen bg-[#F9FAFB] justify-center items-center font-sans py-16">
        <div className="text-center max-w-md mx-auto px-6">
          <img src={cartEmptyImg} alt="Empty Cart" className="w-15 h-15 mx-auto mb-6 opacity-80" />
          <h1 className="text-2xl font-bold text-[#111111] mb-4">Votre panier est vide</h1>
          <p className="text-[#6B7280] mb-8">
            Vous n'avez pas encore ajouté de véhicules à votre panier.
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

  const total = calculateTotal();
  const itemCount = calculateItemCount();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111111] mb-8">
          Mon panier ({itemCount} {itemCount > 1 ? 'articles' : 'article'})
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
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
                    <p className="text-sm text-[#6B7280] mb-2">Par jour</p>
                    <p className="text-smart-blue font-bold text-lg">{item.price} DH</p>
                    
                    {/* Contrôles quantité */}
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full hover:bg-gray-200 transition flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-semibold w-8 text-center text-[#111111]">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full hover:bg-gray-200 transition flex items-center justify-center"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="ml-4 text-red-500 hover:text-red-700 text-sm transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  
                  {/* Prix total */}
                  <div className="text-right">
                    <p className="font-bold text-lg text-[#111111]">
                      {(item.price * item.quantity).toFixed(2)} DH
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Résumé de la commande - Version desktop (sticky) */}
          <div className="hidden lg:block bg-white rounded-2xl border border-[#E5E7EB] p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-[#111111] mb-4">Résumé</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-[#6B7280]">
                <span>Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})</span>
                <span>{total.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Livraison</span>
                <span className="text-green-600">Gratuite</span>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg text-[#111111]">
                  <span>Total</span>
                  <span className="text-smart-blue">{total.toFixed(2)} DH</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">TVA incluse</p>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#111111] text-white py-3 rounded-full hover:opacity-80 transition font-medium"
            >
              Procéder au paiement
            </button>
            
            <Link 
              to="/home" 
              className="block text-center mt-4 text-sm text-[#6B7280] hover:text-[#111111] transition"
            >
              ← Continuer mes achats
            </Link>
          </div>
        </div>

        {/* Résumé de la commande - Version mobile (en bas de page) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 shadow-lg z-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B7280] text-sm">Total</span>
            <span className="text-xl font-bold text-smart-blue">{total.toFixed(2)} DH</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCheckout}
              className="flex-1 bg-[#111111] text-white py-3 rounded-full hover:opacity-80 transition font-medium text-sm"
            >
              Commander
            </button>
            <Link 
              to="/home" 
              className="flex-1 text-center py-3 border border-[#E5E7EB] rounded-full text-sm text-[#6B7280] hover:text-[#111111] hover:border-[#111111] transition"
            >
              Continuer
            </Link>
          </div>
        </div>

        {/* Espace en bas pour le footer mobile (évite que le contenu soit caché) */}
        <div className="lg:hidden h-28" />
      </div>
    </div>
  );
};

export default CartPage;