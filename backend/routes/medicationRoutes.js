// backend/routes/medicationRoutes.js
const express = require('express');
const { addMedication, getMedications, updateMedication, deleteMedication } = require('../controllers/medicationController');

const router = express.Router();

// Route to add a medication
router.post('/', addMedication);

// Route to get medications
router.get('/', getMedications);

// Route to update a medication
router.put('/:id', updateMedication);

// Route to delete a medication
router.delete('/:id', deleteMedication);

module.exports = router;
