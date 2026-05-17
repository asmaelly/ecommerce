const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getAllAgencies,getAgencyById,getAgenciesByCity,createAgency,updateAgency,deleteAgency} = require('../controllers/agencyController');

// Routes publiques
router.get('/agencies', getAllAgencies);
router.get('/agencies/:id', getAgencyById);
router.get('/agencies/city/:city', getAgenciesByCity);

// Routes protégées (admin seulement)
router.post('/agencies', authMiddleware, createAgency);
router.put('/agencies/:id', authMiddleware, updateAgency);
router.delete('/agencies/:id', authMiddleware, deleteAgency);

module.exports = router;