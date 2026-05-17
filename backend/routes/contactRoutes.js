const express = require('express');
const Message = require('../models/Message.js'); 
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;