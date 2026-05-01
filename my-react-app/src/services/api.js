import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (userData) => api.post('/register', userData);
export const login = (userData) => api.post('/login', userData);
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity = 1) => api.post('/cart/add', { productId, quantity });
export const updateCartItem = (productId, quantity) => api.put('/cart/update', { productId, quantity });
export const removeFromCart = (productId) => api.delete(`/cart/remove/${productId}`);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);

// Quiz
export const saveQuizAnswers = (answers) => api.post('/quiz/save', { answers });
export const getQuizResults = () => api.get('/quiz/results');

export default api;