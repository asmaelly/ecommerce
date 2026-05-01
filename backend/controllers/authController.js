const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
        console.log('📝 Tentative d\'inscription:', { username, email }); // ← Ajoute ce log

    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Create user (password hashed automatically by model)
        const user = new User({ username, email, password });
        await user.save();
        
        // Create token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.status(201).json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/login
// @access  Public
const login = async (req, res, next) => {
    const { email, username, password } = req.body;
    
    try {
        // Build $or condition based on what's provided
        const conditions = [];
        if (email) conditions.push({ email });
        if (username) conditions.push({ username });
        
        if (conditions.length === 0) {
            return res.status(400).json({ 
                error: 'Please provide email or username' 
            });
        }
        
        const user = await User.findOne({ $or: conditions });
        
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };