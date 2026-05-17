const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  openingHours: {
    monday: { type: String, default: "09:00 - 18:00" },
    tuesday: { type: String, default: "09:00 - 18:00" },
    wednesday: { type: String, default: "09:00 - 18:00" },
    thursday: { type: String, default: "09:00 - 18:00" },
    friday: { type: String, default: "09:00 - 18:00" },
    saturday: { type: String, default: "10:00 - 14:00" },
    sunday: { type: String, default: "Fermé" }
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
  },
  availableCars: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agency', agencySchema);