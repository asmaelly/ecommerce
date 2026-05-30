const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getProfile, updateProfile, updatePassword } = require('../controllers/profileController');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/profile/password', authMiddleware, updatePassword);

module.exports = router;