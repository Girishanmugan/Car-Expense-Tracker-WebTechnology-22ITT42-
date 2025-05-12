const express = require('express');
const router = express.Router();
const Maintenance = require('../models/maintenance.model'); // Assuming you have a Mongoose model for maintenance records

// Get all maintenance records
router.get('/', async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();
    res.status(200).json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance records', error });
  }
});

// Add a new maintenance record
router.post('/', async (req, res) => {
  const { date, type, cost } = req.body;

  try {
    const newMaintenanceRecord = new Maintenance({ date, type, cost });
    const savedMaintenanceRecord = await newMaintenanceRecord.save();
    res.status(201).json(savedMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error adding maintenance record', error });
  }
});

// Update a maintenance record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, type, cost } = req.body;

  try {
    const updatedMaintenanceRecord = await Maintenance.findByIdAndUpdate(
      id,
      { date, type, cost },
      { new: true }
    );
    if (!updatedMaintenanceRecord) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }
    res.status(200).json(updatedMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance record', error });
  }
});

// Delete a maintenance record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMaintenanceRecord = await Maintenance.findByIdAndDelete(id);
    if (!deletedMaintenanceRecord) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }
    res.status(200).json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maintenance record', error });
  }
});

module.exports = router;