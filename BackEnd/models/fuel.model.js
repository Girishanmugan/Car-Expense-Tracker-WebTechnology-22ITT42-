const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  liters: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Fuel', fuelSchema);