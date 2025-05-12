const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  fuelUsed: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);