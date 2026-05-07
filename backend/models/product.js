const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/300x200?text=Product"
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);