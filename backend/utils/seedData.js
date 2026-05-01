const Product = require('../models/Product');

const sampleProducts = [
    { name: "Gaming Laptop", price: 999.99, description: "High performance gaming laptop with RTX 4060", stock: 10, image: "https://via.placeholder.com/300x200?text=Laptop" },
    { name: "Wireless Mouse", price: 29.99, description: "Ergonomic wireless mouse with RGB lighting", stock: 50, image: "https://via.placeholder.com/300x200?text=Mouse" },
    { name: "Mechanical Keyboard", price: 79.99, description: "RGB mechanical keyboard with blue switches", stock: 30, image: "https://via.placeholder.com/300x200?text=Keyboard" },
    { name: "4K Monitor", price: 299.99, description: "27 inch 4K UHD monitor", stock: 15, image: "https://via.placeholder.com/300x200?text=Monitor" },
    { name: "Noise Cancelling Headphones", price: 159.99, description: "Wireless noise cancelling headphones", stock: 25, image: "https://via.placeholder.com/300x200?text=Headphones" }
];

const seedProducts = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            await Product.insertMany(sampleProducts);
            console.log('📦 Sample products added to database');
        }
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = { seedProducts };