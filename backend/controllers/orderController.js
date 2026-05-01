const Order = require('../models/order');
const Cart = require('../models/cart');

// @desc    Create order from cart
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
    const { shippingAddress, phone } = req.body;
    
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        
        const order = new Order({
            userId: req.userId,
            items: cart.items,
            totalAmount: cart.total,
            shippingAddress,
            phone,
            status: 'pending'
        });
        
        await order.save();
        
        // Clear cart
        await Cart.deleteOne({ userId: req.userId });
        
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getOrders, getOrderById };