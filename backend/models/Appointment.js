const Appointment = require('../models/Appointment');

// Create a new appointment
const createAppointment = async (req, res) => {
  const { patientId, doctor, date, time, reason } = req.body;

  try {
    const newAppointment = new Appointment({
      patientId,
      doctor,
      date,
      time,
      reason,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// Get all appointments for a patient
const getAppointments = async (req, res) => {
  const { patientId } = req.params; // Get patientId from route parameters

  try {
    const appointments = await Appointment.find({ patientId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
