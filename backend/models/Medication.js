// models/Medication.js
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user (patient)
    required: true,
  },
  medicationName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Medication = mongoose.model('Medication', medicationSchema);
module.exports = Medication;
