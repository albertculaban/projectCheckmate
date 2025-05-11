// controllers/userController.js
const User = require('../models/User');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
};

// controllers/userController.js
exports.updatePatient = async (req, res) => {
  try {
    const patient = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated user
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update patient' });
  }
};


exports.deletePatient = async (req, res) => {
  try {
    const patient = await User.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete patient' });
  }
};

