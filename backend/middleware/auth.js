const jwt = require('jsonwebtoken');// Permet de travailler avec les tokens
// Ce middleware vérifie que l’utilisateur est authentifié avant d’accéder à certaines routes. Il extrait le token du header Authorization, le vérifie, et ajoute l’ID de l’utilisateur à req.userId pour les contrôleurs suivants.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';// Clé secrète pour signer les tokens (à stocker dans .env en production)

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Please login.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;