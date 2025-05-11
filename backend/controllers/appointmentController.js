const Appointment = require('../models/Appointment');  // Make sure to import the Appointment model

// Create a new appointment
const createAppointment = async (req, res) => {
  const { patientId, doctor, date, time, reason } = req.body;

  try {
    // Create a new appointment and save it in the database
    const newAppointment = new Appointment({
      patientId,  // Reference to the patient (User)
      doctor,
      date,
      time,
      reason,
    });

    await newAppointment.save();  // Save the new appointment in MongoDB
    res.status(201).json(newAppointment);  // Return the created appointment
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();  // Fetch all appointments
    res.status(200).json(appointments);  // Return the appointments
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;  // Get the appointment ID from URL params
  const { doctor, date, time, reason } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      doctor,
      date,
      time,
      reason,
    }, { new: true });  // Return the updated document

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);  // Return the updated appointment
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;  // Get the appointment ID from URL params

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });  // Return a success message
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
