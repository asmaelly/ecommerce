const Agency = require('../models/Agency');

// Récupérer toutes les agences
const getAllAgencies = async (req, res, next) => {
  try {
    const agencies = await Agency.find({ isActive: true });
    res.json(agencies);
  } catch (error) {
    next(error);
  }
};

// Récupérer une agence par ID
const getAgencyById = async (req, res, next) => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }
    res.json(agency);
  } catch (error) {
    next(error);
  }
};

// Récupérer les agences par ville
const getAgenciesByCity = async (req, res, next) => {
  try {
    const agencies = await Agency.find({ 
      city: { $regex: new RegExp(req.params.city, 'i') },
      isActive: true 
    });
    res.json(agencies);
  } catch (error) {
    next(error);
  }
};

// Créer une agence (admin)
const createAgency = async (req, res, next) => {
  try {
    const agency = new Agency(req.body);
    await agency.save();
    res.status(201).json(agency);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une agence (admin)
const updateAgency = async (req, res, next) => {
  try {
    const agency = await Agency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!agency) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }
    res.json(agency);
  } catch (error) {
    next(error);
  }
};

// Supprimer une agence (admin)
const deleteAgency = async (req, res, next) => {
  try {
    const agency = await Agency.findByIdAndDelete(req.params.id);
    if (!agency) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }
    res.json({ message: 'Agence supprimée avec succès' });
  } catch (error) {
    next(error);
  }
};

module.exports = {getAllAgencies,getAgencyById,getAgenciesByCity,createAgency,updateAgency,deleteAgency};