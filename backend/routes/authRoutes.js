
// Les routes sont les chemins URL que l’utilisateur peut appeler dans ton application. Dans server.js, tu montes des routeurs :

//authRoutes gère les chemins d’authentification (/login, /register, etc.)


const express = require('express');
const router = express.Router();// Permet de créer des routeurs
const { register, login } = require('../controllers/authController');// Importe les fonctions de ton contrôleur d’authentification

router.post('/register', register);
router.post('/login', login);

module.exports = router;

