// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/checkRole');
const User = require('../models/User'); // Use the correct User model
const bcrypt = require('bcryptjs');

// Get all patients (users with role: 'patient')
router.get('/patients', protect, checkAdmin, async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }); // Query the 'users' collection for patients
    if (!patients) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.json(patients); // Respond with patients data
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients', error: err });
  }
});

// Get a specific patient by ID
router.get('/patients/:id', protect, checkAdmin, async (req, res) => {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: 'patient' }).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient' });
  }
});

// Add a new patient
router.post('/patients', protect, checkAdmin, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'patient',
    });

    res.status(201).json({ message: 'Patient created', patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error creating patient', error: err });
  }
});

// Admin can edit a patient
router.put('/patients/:id', protect, checkAdmin, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id, 
      { name, email },
      { new: true } // Return the updated document
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: 'Error updating patient', error: err });
  }
});


module.exports = router;
