// controllers/medicationController.js
const Medication = require('../models/Medication');

// Add a new medication entry
const addMedication = async (req, res) => {
  const { patientId, medicationName, dosage, frequency } = req.body;

  try {
    const newMedication = new Medication({
      patientId, 
      medicationName,
      dosage,
      frequency,
    });

    await newMedication.save();  // Save to MongoDB
    res.status(201).json(newMedication);  // Return the newly created medication
  } catch (err) {
    res.status(500).json({ message: 'Error adding medication' });
  }
};

// Get all medications
const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();  // Fetch all medications
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medications' });
  }
};

// Update a medication
const updateMedication = async (req, res) => {
  const { id } = req.params;
  const { medicationName, dosage, frequency } = req.body;

  try {
    const updatedMedication = await Medication.findByIdAndUpdate(id, {
      medicationName,
      dosage,
      frequency,
    }, { new: true });

    if (!updatedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedMedication);
  } catch (err) {
    res.status(500).json({ message: 'Error updating medication' });
  }
};

// Delete a medication
const deleteMedication = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMedication = await Medication.findByIdAndDelete(id);

    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json({ message: 'Medication deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting medication' });
  }
};

module.exports = {
  addMedication,
  getMedications,
  updateMedication,
  deleteMedication,
};
