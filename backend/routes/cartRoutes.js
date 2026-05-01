const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');

router.get('/cart', authMiddleware, getCart);
router.post('/cart/add', authMiddleware, addToCart);
router.put('/cart/update', authMiddleware, updateCart);
router.delete('/cart/remove/:productId', authMiddleware, removeFromCart);

module.exports = router;