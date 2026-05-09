import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ items: [] });

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.items.find(item => item.productId === product._id);
      
      if (existingItem) {
        // Si déjà dans les favoris, ne rien faire
        return prevWishlist;
      }
      
      return {
        ...prevWishlist,
        items: [...prevWishlist.items, {
          productId: product._id,
          name: product.type,
          price: product.pricePerDay,
          image: product.image,
          fuelType: product.fuelType,
          rating: product.rating
        }]
      };
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => ({
      ...prevWishlist,
      items: prevWishlist.items.filter(item => item.productId !== productId)
    }));
  };

  const isInWishlist = (productId) => {
    return wishlist.items.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlist({ items: [] });
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};