const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  bloodPressure: String,
  heartRate: Number,
  respiratoryRate: Number,
  temperature: Number,
  oxygenSaturation: Number,
  bloodGlucose: Number,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const HealthLog = mongoose.model('HealthLog', healthLogSchema);
module.exports = HealthLog;
