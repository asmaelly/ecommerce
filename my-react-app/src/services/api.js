import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to automatically add token (Web version)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========== AUTHENTICATION ==========
export const register = (userData) => api.post('/register', userData);

export const login = (identifier, password) => {
  // Determine if it's email or username
  const isEmail = identifier.includes('@');
  
  const loginData = { password };
  
  if (isEmail) {
    loginData.email = identifier;
  } else {
    loginData.username = identifier;
  }
  
  return api.post('/login', loginData);
};

// ========== VALIDATION ==========
export const validateUsername = (username) => {
  if (!username) return 'Username required';
  if (username.length < 3) return 'Min 3 characters';
  if (username.length > 20) return 'Max 20 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Only letters, numbers, underscore';
  return null;
};

export const validateEmail = (email) => {
  if (!email) return 'Email required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password required';
  if (password.length < 6) return 'Min 6 characters';
  if (!/[A-Z]/.test(password)) return 'Need 1 uppercase';
  if (!/[a-z]/.test(password)) return 'Need 1 lowercase';
  if (!/[0-9]/.test(password)) return 'Need 1 number';
  if (!/[!@#$%^&*]/.test(password)) return 'Need 1 special char (!@#$%^&*)';
  return null;
};

export const validateRegisterForm = (username, email, password) => {
  const errors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
  };
  const filtered = Object.fromEntries(Object.entries(errors).filter(([_, v]) => v));
  return { isValid: !Object.keys(filtered).length, errors: filtered };
};

// ========== PRODUCTS ==========
export const getProduct = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);

// ========== CART ==========
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity = 1) => 
  api.post('/cart/add', { productId, quantity });
export const updateCartItem = (productId, quantity) => 
  api.put('/cart/update', { productId, quantity });
export const removeFromCart = (productId) => 
  api.delete(`/cart/remove/${productId}`);

// ========== ORDERS ==========
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// ========== PROFILE ==========
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// ========== QUIZ ==========
export const saveQuizAnswers = (answers) => api.post('/quiz/save', { answers });
export const getQuizResults = () => api.get('/quiz/results');

// ✅ CORRECTION ICI - Utilisez 'api' au lieu de 'axiosInstance'
export const getRecommendations = async () => {
  const response = await api.get('/quiz/recommendations');
  return response;
};

export default api;