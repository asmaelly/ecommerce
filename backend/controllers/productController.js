const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById };
