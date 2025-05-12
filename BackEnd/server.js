const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // Add CORS middleware for frontend-backend communication

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/car-expense-tracker', {
  // Removed deprecated options
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS for all routes

// Routes
const authRoutes = require('./routes/auth.routes');
const expensesRoutes = require('./routes/expenses.routes');
const fuelRoutes = require('./routes/fuel.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const tripsRoutes = require('./routes/trips.routes');
  
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/trips', tripsRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Car Expense Tracker Backend is running!');
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});