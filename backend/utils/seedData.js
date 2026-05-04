// backend/utils/seedData.js
const Product = require('../models/Product');

const productsData = [
  {
    type: "Dacia Sandero",
    pricePerDay: 400,
    description: "Citadine économique et fiable, idéale pour la ville. Faible consommation d'essence.",
    fuelType: "Essence",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500"
  },
  {
    type: "Dacia Logan",
    pricePerDay: 450,
    description: "Berline spacieuse au meilleur rapport qualité-prix. Idéale pour les longs trajets.",
    fuelType: "Essence",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35c?w=500"
  },
  {
    type: "Dacia Duster",
    pricePerDay: 550,
    description: "SUV compact abordable, parfait pour les aventures en famille ou les voyages.",
    fuelType: "Diesel",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"
  },
  {
    type: "Citroën C3",
    pricePerDay: 500,
    description: "Citadine française au design original et confortable. Parfaite pour la ville.",
    fuelType: "Essence",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500"
  },
  {
    type: "Citroën C5 Aircross",
    pricePerDay: 750,
    description: "SUV confortable avec suspension hydropneumatique. Idéal pour les longs voyages.",
    fuelType: "Hybride",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"
  },
  {
    type: "Peugeot 208",
    pricePerDay: 550,
    description: "Citadine moderne et dynamique au style affirmé. Très agréable à conduire.",
    fuelType: "Essence",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500"
  },
  {
    type: "Peugeot 3008",
    pricePerDay: 850,
    description: "SUV compact au design élégant et technologie avancée. Confortable sur tous les terrains.",
    fuelType: "Hybride",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"
  },
  {
    type: "Renault Clio",
    pricePerDay: 480,
    description: "Citadine française la plus vendue. Idéale pour les déplacements quotidiens.",
    fuelType: "Essence",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500"
  },
  {
    type: "Renault Captur",
    pricePerDay: 650,
    description: "SUV urbain au style tendance. Modulable et pratique pour toute la famille.",
    fuelType: "Essence",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"
  },
  {
    type: "BMW Série 1",
    pricePerDay: 1200,
    description: "Compacte premium allemande. Tenue de route exceptionnelle et finitions haut de gamme.",
    fuelType: "Essence",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500"
  },
  {
    type: "BMW Série 3",
    pricePerDay: 1500,
    description: "Berline sportive de prestige. Puissance et élégance réunies dans un seul véhicule.",
    fuelType: "Diesel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500"
  },
  {
    type: "Mercedes Classe A",
    pricePerDay: 1300,
    description: "Compacte premium au design moderne. Technologies innovantes et grand confort.",
    fuelType: "Essence",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500"
  },
  {
    type: "Audi A3",
    pricePerDay: 1250,
    description: "Compacte premium allemande. Design épuré et technologies de pointe.",
    fuelType: "Essence",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500"
  },
  {
    type: "Tesla Model 3",
    pricePerDay: 2000,
    description: "Berline électrique haut de gamme. Autonomie exceptionnelle et technologies futuristes.",
    fuelType: "Électrique",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500"
  },
  {
    type: "Volkswagen Golf",
    pricePerDay: 600,
    description: "Compacte allemande polyvalente. Qualité de fabrication et fiabilité reconnues.",
    fuelType: "Essence",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35c?w=500"
  }
];

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('📦 Aucun produit trouvé. Insertion des données par défaut...');
      await Product.insertMany(productsData);
      console.log('✅ Produits insérés avec succès !');
    } else {
      console.log(`📦 ${count} produits déjà présents en base.`);
    }
  } catch (error) {
    console.error('❌ Erreur lors du seed des produits:', error);
  }
};

module.exports = { seedProducts };