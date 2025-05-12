const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.model'); // Assuming you have a Mongoose model for trip records

// Get all trip records
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip records', error });
  }
});

// Add a new trip record
router.post('/', async (req, res) => {
  const { date, startLocation, endLocation, distance, fuelUsed, cost } = req.body;

  try {
    const newTrip = new Trip({ date, startLocation, endLocation, distance, fuelUsed, cost });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error adding trip record', error });
  }
});

// Update a trip record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, startLocation, endLocation, distance, fuelUsed, cost } = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { date, startLocation, endLocation, distance, fuelUsed, cost },
      { new: true }
    );
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip record not found' });
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip record', error });
  }
});

// Delete a trip record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip record not found' });
    }
    res.status(200).json({ message: 'Trip record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip record', error });
  }
});

module.exports = router;