// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { checkPatient, checkAdmin } = require('../middleware/checkRole');
const User = require('../models/User');
const { getAllPatients } = require('../controllers/userControllers');

// Fetch a user's profile (for patients)
router.get('/profile', protect, checkPatient, async (req, res) => {
  try {
    const patient = await User.findById(req.user._id); // Fetch user's profile by ID
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// backend/routes/userRoutes.js
router.get('/patients', getAllPatients);  // Ensure this route exists

module.exports = router;
