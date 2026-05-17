import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CartSkeleton } from '../components/Skeletons';
import favEmptyImg from '../assets/fav2.svg';

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

  if (!wishlist) {
    return <CartSkeleton />;
  }

  if (!wishlist.items || wishlist.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <img
            src={favEmptyImg}
            alt="Favoris vide"
            className="w-24 h-24 mx-auto mb-8 opacity-90"
          />

          <h1 className="text-4xl font-['Clash_Display'] text-[#111111] mb-4">
            Aucun favoris
          </h1>

          <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
            Vous n'avez pas encore ajouté de véhicules à vos favoris.
          </p>

          <Link
            to="/home"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#111111] text-white text-sm hover:opacity-90 transition"
          >
            Découvrir les véhicules
          </Link>

        </div>

      </div>
    );
  }

  const itemCount = wishlist.items.length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 font-sans">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-14">

          <p className="text-sm text-[#9CA3AF] mb-3 uppercase tracking-[0.2em]">
            Collection
          </p>

          <h1 className="text-5xl font-['Clash_Display'] text-[#111111] mb-4">
            Mes Favoris
          </h1>

          <p className="text-sm text-[#6B7280]">
            {itemCount} {itemCount > 1 ? 'véhicules sauvegardés' : 'véhicule sauvegardé'}
          </p>

        </div>

        {/* LIST */}
        <div className="space-y-6 ">

          {wishlist.items.map((item) => (

            <div
              key={item._id || item.productId}
              className="group bg-white border border-[#ECECEC] rounded-[28px] p-4 md:p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >

              <div className="flex flex-col lg:flex-row gap-6">

                {/* IMAGE */}
                <div className="relative w-full lg:w-[300px] h-[220px] rounded-3xl overflow-hidden bg-[#F3F4F6] flex-shrink-0">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-8"
                        />
                      </svg>
                    </div>
                  )}

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() =>
                      handleRemoveFromWishlist(item._id || item.productId)
                    }
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>

                    {/* TOP */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">

                      <div className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#ECECEC] text-[11px] text-[#6B7280]">
                        {item.fuelType || 'Essence'}
                      </div>

                      {item.rating && (
                        <div className="flex items-center gap-1 text-[12px] text-[#6B7280]">
                          <span className="text-yellow-500">★</span>
                          {item.rating}
                        </div>
                      )}

                    </div>

                    {/* TITLE */}
                    <Link to={`/product/${item._id || item.productId}`}>

                      <h2 className="text-3xl font-semibold text-[#111111] mb-4 hover:text-[#FBBF24] transition">
                        {item.name || item.type}
                      </h2>

                    </Link>

                    {/* PRICE */}
                    <div className="flex items-end gap-2 mb-6">

                      <p className="text-3xl font-bold text-[#111111]">
                        {item.price || item.pricePerDay} DH
                      </p>

                      <span className="text-sm text-[#9CA3AF] mb-1">
                        / jour
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-6 py-3 rounded-full bg-[#111111] text-white text-sm hover:opacity-90 transition"
                    >
                      Ajouter au panier
                    </button>

                    <Link
                      to={`/product/${item._id || item.productId}`}
                      className="px-6 py-3 rounded-full border border-[#E5E7EB] text-sm text-[#111111] hover:bg-[#111111] hover:text-white transition"
                    >
                      Voir détails
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-14 text-center">

          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition"
          >
            Continuer mes achats
          </Link>

        </div>

      </div>

    </div>
  );
};

export default FavorisPage;