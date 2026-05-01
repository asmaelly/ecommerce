const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    
    // Erreur Mongoose (validation, duplication...)
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    
    if (err.code === 11000) {
        return res.status(400).json({ error: 'Duplicate key error' });
    }
    
    // Erreur par défaut
    res.status(500).json({ error: err.message || 'Internal server error' });
};

module.exports = errorHandler;