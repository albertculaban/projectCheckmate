// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const adminRoutes = require('./routes/adminRoutes');  // Admin-specific routes
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();
dotenv.config();

// Middleware
app.use(cors());  // To allow cross-origin requests
app.use(express.json());  // To parse JSON requests

// Use routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/appointments', appointmentRoutes);  // Appointment routes
app.use('/api/health', healthRoutes);  // Health-related routes
app.use('/api/medications', medicationRoutes);  // Medication routes
app.use('/api/admin', adminRoutes);  // Admin-specific routes
app.use('/api/users', userRoutes);  // Ensure this is correctly mapped

// Serve static videos
app.use('/Videos', express.static(path.join(__dirname, 'Videos')));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'build')));

// Fallback for React routing (e.g., /dashboard, /login)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect to MongoDB (adjust as needed for your environment)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
