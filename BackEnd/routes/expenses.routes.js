const express = require('express');
const router = express.Router();
const Expense = require('../models/expense.model'); // Assuming you have a Mongoose model for expenses

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
    const { date, category, amount, note } = req.body || {}; // Ensure req.body is not undefined
  
    if (!date || !category || !amount) {
      return res.status(400).json({ message: 'Date, category, and amount are required' });
    }
  
    try {
      const newExpense = new Expense({ date, category, amount, note });
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ message: 'Error adding expense', error });
    }
  });

// Update an expense
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, category, amount, note } = req.body;

  if (!date || !category || !amount) {
    return res.status(400).json({ message: 'Date, category, and amount are required' });
  }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { date, category, amount, note },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Error updating expense', error });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Error deleting expense', error });
  }
});

module.exports = router;