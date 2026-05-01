const mongoose = require('mongoose');


// Un order contient une référence à l’utilisateur qui a passé la commande (userId), une liste d’items (chaque item contient une référence au produit, son nom, son prix et la quantité), le montant total de la commande, l’adresse de livraison, le numéro de téléphone, le statut de la commande (en attente, payé, expédié, livré, annulé) et la date de création.
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


// Le schéma de l’order utilise un sous-schéma pour les items, ce qui permet 
// de stocker les détails de chaque produit commandé directement dans la commande,
// sans avoir à faire des jointures complexes lors de la récupération des commandes.
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);