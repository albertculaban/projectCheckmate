import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Container } from 'react-bootstrap';

function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-05-12',
      time: '10:00 AM',
      doctor: 'Dr. Smith',
      reason: 'Blood Pressure Review',
    },
    {
      id: 2,
      date: '2025-05-18',
      time: '2:30 PM',
      doctor: 'Dr. Lee',
      reason: 'Diabetes Follow-up',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleReschedule = (appt) => {
    setSelectedAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setShowModal(true);
  };

  const handleSubmit = () => {
    const updated = appointments.map(appt =>
      appt.id === selectedAppointment.id
        ? { ...appt, date: newDate, time: newTime }
        : appt
    );
    setAppointments(updated);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3>Appointments</h3>
        <p className="text-muted">Review and reschedule upcoming appointments.</p>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.doctor}</td>
                <td>{appt.reason}</td>
                <td>
                  <Button variant="outline-primary" size="sm" onClick={() => handleReschedule(appt)}>
                    Reschedule
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Reschedule Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Date</Form.Label>
              <Form.Control
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>New Time</Form.Label>
              <Form.Control
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Appointments;
