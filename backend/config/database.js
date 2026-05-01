const mongoose = require('mongoose');
const { seedProducts } = require('../utils/seedData');

const connectDB = async () => {
    try {
        // Utiliser une variable d'environnement pour l'URI MongoDB
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
        
        await mongoose.connect(mongoURI);
        
        console.log('✅ MongoDB Connected to ecommerce database');
        
        // Ajouter des produits d'exemple si la base est vide
        await seedProducts();
        
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        console.log('Make sure MongoDB is running on localhost:27017');
        process.exit(1);
    }
};

module.exports = connectDB;