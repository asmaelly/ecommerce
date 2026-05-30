import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartSkeleton } from '../components/Skeletons';
import cartEmptyImg from '../assets/cart2.svg';

const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) removeItem(productId);
    else updateQuantity(productId, newQuantity);
  };

  // Fonction pour obtenir l'URL complète de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) {
      return `http://localhost:3000${imagePath}`;
    }
    return `http://localhost:3000/uploads/${imagePath}`;
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((t, i) => t + i.price * i.quantity, 0);
  };

  const calculateItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((s, i) => s + i.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cart) return <CartSkeleton />;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="h-100 bg-[#F9FAFB] flex items-center justify-center font-['Manrope']">
        <div className="text-center max-w-md">
          <img src={cartEmptyImg} className="w-20 mx-auto mb-6 opacity-70" alt="Panier vide" />
          <h1 className="text-2xl font-semibold text-[#111111] mb-2">
            Votre panier est vide
          </h1>
          <p className="text-sm text-[#6B7280] mb-6">
            Ajoutez des véhicules pour commencer votre réservation.
          </p>

          <Link
            to="/home"
            className="px-6 py-3 rounded-full bg-[#111111] text-white text-sm hover:opacity-90 transition"
          >
            Découvrir les véhicules
          </Link>
        </div>
      </div>
    );
  }

  const total = calculateTotal();
  const itemCount = calculateItemCount();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Manrope'] py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#111111]">
            Mon panier
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {itemCount} véhicule{itemCount > 1 ? 's' : ''} sélectionné{itemCount > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CART LIST */}
          <div className="lg:col-span-2 space-y-4">

            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="bg-white border border-[#ECECEC] rounded-[24px] p-5 hover:shadow-md transition"
              >
                <div className="flex gap-5">

                  {/* IMAGE - Version corrigée */}
                  <div className="w-28 h-24 rounded-xl overflow-hidden bg-[#F9FAFB] flex-shrink-0">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name || item.type}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Erreur chargement image:', item.image);
                          e.target.src = 'https://placehold.co/600x400/2c3e50/white?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#111111]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#6B7280] mt-1">
                      {item.price} DH / jour
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-[#ECECEC] hover:bg-[#F3F4F6] transition"
                      >
                        -
                      </button>

                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-[#ECECEC] hover:bg-[#F3F4F6] transition"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-4 text-sm text-red-500 hover:text-red-600 transition"
                      >
                        Supprimer
                      </button>

                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="text-right">
                    <p className="font-semibold text-[#111111]">
                      {(item.price * item.quantity).toFixed(2)} DH
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white border border-[#ECECEC] rounded-[24px] p-6 h-fit sticky top-24">

            <h2 className="text-lg font-semibold text-[#111111] mb-5">
              Résumé
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between text-[#6B7280]">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} DH</span>
              </div>

              <div className="flex justify-between text-[#6B7280]">
                <span>Livraison</span>
                <span className="text-green-600">Gratuite</span>
              </div>

              <div className="border-t border-[#ECECEC] pt-3 mt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#111111]">{total.toFixed(2)} DH</span>
              </div>

            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#111111] text-white py-3 rounded-full hover:opacity-90 transition"
            >
              Réserver maintenant 
            </button>

            <Link
              to="/home"
              className="block text-center mt-4 text-sm text-[#6B7280] hover:text-[#111111] transition"
            >
              Continuer mes achats
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;