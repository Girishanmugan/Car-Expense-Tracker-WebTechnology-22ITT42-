const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);