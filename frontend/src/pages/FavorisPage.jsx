import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CartSkeleton } from '../components/Skeletons';
import Footer from '../components/Footer';

const FavorisPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

// Dans FavorisPage.jsx
const handleAddToCart = (product) => {
  // Passer l'objet produit complet avec l'image
  addToCart({
    _id: product._id || product.productId,
    name: product.name || product.type,
    price: product.price || product.pricePerDay,
    image: product.image  // ✅ L'image est incluse
  }, 1);
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
      <div className="h-100 bg-[#F9FAFB] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <svg className="w-10 h-10 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-light text-[#001233] mb-3">Aucun favori</h1>
          <p className="text-sm text-[#5C677D] mb-8">
            Vous n'avez pas encore ajouté de véhicules à vos favoris.
          </p>
          <Link
            to="/home"
            className="inline-block px-8 py-3 bg-[#111111] text-white rounded-full text-sm hover:bg-[#222222] transition"
          >
            Découvrir les véhicules
          </Link>
        </div>
      </div>
    );
  }

  const itemCount = wishlist.items.length;

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-light text-[#001233] tracking-tight">Mes favoris</h1>
          <div className="w-12 h-px bg-[#0466C8] mt-2 mb-4"></div>
          <p className="text-sm text-[#5C677D]">{itemCount} véhicule{itemCount > 1 ? 's' : ''} sauvegardé{itemCount > 1 ? 's' : ''}</p>
        </div>

        {/* Liste des favoris */}
        <div className="space-y-4">
          {wishlist.items.map((item) => (
            <div
              key={item._id || item.productId}
              className="bg-white rounded-2xl border border-[#E8ECF1] overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                
                {/* Image */}
                <div className="relative w-full md:w-56 h-48 bg-[#F5F6F8] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || item.type}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#C5CBD3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-8" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Bouton supprimer */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id || item.productId)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Informations */}
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h2 className="text-xl font-medium text-[#001233] mb-1">
                        {item.name || item.type}
                      </h2>
                      <p className="text-sm text-[#7D8597]">{item.fuelType || 'Essence'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-light text-[#0466C8]">{item.price || item.pricePerDay} DH</span>
                      <span className="text-sm text-[#7D8597] ml-1">/jour</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#5C677D] mt-3 mb-4 line-clamp-2">
                    {item.description || "Découvrez ce véhicule d'exception alliant confort et performance."}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-5 py-2 bg-[#FFD700] text-white rounded-full text-sm hover:bg-[#023E7D] transition"
                    >
                      Ajouter au panier
                    </button>
                    <Link
                      to={`/products/${item._id || item.productId}`}
                      className="px-5 py-2 border border-[#E8ECF1] text-[#5C677D] rounded-full text-sm hover:border-[#0466C8] hover:text-[#0466C8] transition"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton continuer */}
        <div className="mt-10 text-center">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-sm text-[#5C677D] hover:text-[#0466C8] transition"
          >
            ← Continuer mes achats
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default FavorisPage;