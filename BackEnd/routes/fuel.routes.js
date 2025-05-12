const express = require('express');
const router = express.Router();
const Fuel = require('../models/fuel.model'); // Assuming you have a Mongoose model for fuel records

// Get all fuel records
router.get('/', async (req, res) => {
  try {
    const fuelRecords = await Fuel.find();
    res.status(200).json(fuelRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel records', error });
  }
});

// Add a new fuel record
router.post('/', async (req, res) => {
  const { date, liters, totalCost } = req.body;

  try {
    const newFuelRecord = new Fuel({ date, liters, totalCost });
    const savedFuelRecord = await newFuelRecord.save();
    res.status(201).json(savedFuelRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error adding fuel record', error });
  }
});

// Update a fuel record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, liters, totalCost } = req.body;

  try {
    const updatedFuelRecord = await Fuel.findByIdAndUpdate(
      id,
      { date, liters, totalCost },
      { new: true }
    );
    if (!updatedFuelRecord) {
      return res.status(404).json({ message: 'Fuel record not found' });
    }
    res.status(200).json(updatedFuelRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating fuel record', error });
  }
});

// Delete a fuel record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFuelRecord = await Fuel.findByIdAndDelete(id);
    if (!deletedFuelRecord) {
      return res.status(404).json({ message: 'Fuel record not found' });
    }
    res.status(200).json({ message: 'Fuel record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fuel record', error });
  }
});

module.exports = router;