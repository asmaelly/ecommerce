const mongoose = require('mongoose');
require('dotenv').config();
const { seedProducts } = require('../utils/seedData');
const Product = require('../models/Product');

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car_rental');
    console.log('Connected to MongoDB');
    await seedProducts();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();