const HealthLog = require('../models/HealthLog');

// Add a new health log
const addHealthLog = async (req, res) => {
  const { patientId, bloodPressure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, bloodGlucose } = req.body;

  try {
    const newHealthLog = new HealthLog({
      patientId,
      bloodPressure,
      heartRate,
      respiratoryRate,
      bodyTemperature,
      oxygenSaturation,
      bloodGlucose,
    });

    await newHealthLog.save();
    res.status(201).json(newHealthLog);
  } catch (err) {
    res.status(500).json({ message: 'Error adding health log' });
  }
};

// Get all health logs
const getHealthLogs = async (req, res) => {
  try {
    const healthLogs = await HealthLog.find();
    res.status(200).json(healthLogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching health logs' });
  }
};

// Update a health log
const updateHealthLog = async (req, res) => {
  const { id } = req.params;
  const { bloodPressure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, bloodGlucose } = req.body;

  try {
    const updatedHealthLog = await HealthLog.findByIdAndUpdate(
      id,
      { bloodPressure, heartRate, respiratoryRate, bodyTemperature, oxygenSaturation, bloodGlucose },
      { new: true }
    );

    if (!updatedHealthLog) {
      return res.status(404).json({ message: 'Health log not found' });
    }

    res.status(200).json(updatedHealthLog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating health log' });
  }
};

// Delete a health log
const deleteHealthLog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHealthLog = await HealthLog.findByIdAndDelete(id);

    if (!deletedHealthLog) {
      return res.status(404).json({ message: 'Health log not found' });
    }

    res.status(200).json({ message: 'Health log deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting health log' });
  }
};

module.exports = {
  addHealthLog,
  getHealthLogs,
  updateHealthLog,
  deleteHealthLog,
};
