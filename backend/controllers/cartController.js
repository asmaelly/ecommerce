const Cart = require('../models/cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            cart = { items: [], total: 0 };
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res, next) => {
    const { productId, quantity = 1 } = req.body;
    
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        let cart = await Cart.findOne({ userId: req.userId });
        
        if (!cart) {
            cart = new Cart({ 
                userId: req.userId, 
                items: [], 
                total: 0 
            });
        }
        
        // Utiliser pricePerDay au lieu de price
        const productPrice = product.pricePerDay;
        
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: product._id,
                name: product.type, // Utiliser 'type' au lieu de 'name'
                price: productPrice,
                quantity: quantity,
                image: product.image // Optionnel : ajouter l'image
            });
        }
        
        // Recalculer le total avec gestion des erreurs
        let total = 0;
        for (const item of cart.items) {
            if (item.price && typeof item.price === 'number' && !isNaN(item.price)) {
                total += item.price * item.quantity;
            }
        }
        cart.total = total;
        cart.updatedAt = Date.now();
        
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCart = async (req, res, next) => {
    const { productId, quantity } = req.body;
    
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        } else {
            item.quantity = quantity;
        }
        
        // Recalculer le total
        let total = 0;
        for (const item of cart.items) {
            if (item.price && typeof item.price === 'number' && !isNaN(item.price)) {
                total += item.price * item.quantity;
            }
        }
        cart.total = total;
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
        
        // Recalculer le total
        let total = 0;
        for (const item of cart.items) {
            if (item.price && typeof item.price === 'number' && !isNaN(item.price)) {
                total += item.price * item.quantity;
            }
        }
        cart.total = total;
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        cart.items = [];
        cart.total = 0;
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        next(error);
    }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };