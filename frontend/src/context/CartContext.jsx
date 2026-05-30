import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart as getCartApi, addToCart as addToCartApi, updateCartItem as updateCartItemApi, removeFromCart as removeFromCartApi } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart({ items: [], total: 0 });
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const response = await getCartApi();
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await addToCartApi(productId, quantity);
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await updateCartItemApi(productId, quantity);
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await removeFromCartApi(productId);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};