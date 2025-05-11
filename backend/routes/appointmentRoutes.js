// backend/routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

const router = express.Router();

// Route to create a new appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to update an appointment
router.put('/:id', updateAppointment);

// Route to delete an appointment
router.delete('/:id', deleteAppointment);

module.exports = router;
