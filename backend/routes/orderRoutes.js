const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');

router.post('/orders', authMiddleware, createOrder);
router.get('/orders', authMiddleware, getOrders);
router.get('/orders/:id', authMiddleware, getOrderById);

module.exports = router;