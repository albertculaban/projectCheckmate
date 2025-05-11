import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Table, Alert, Row, Col } from 'react-bootstrap';
import { addMedication, getMedications } from '../api/api';

function Medications() {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    schedule: '',
  });

  const [medications, setMedications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMeds();
  }, []);

  const fetchMeds = async () => {
    try {
      const data = await getMedications();
      setMedications(data);
    } catch (err) {
      console.error('Failed to fetch medications');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedication(formData);
      setMessage(`✅ Medication "${formData.name}" added.`);
      setFormData({ name: '', dosage: '', schedule: '' });
      fetchMeds();
    } catch {
      setMessage('❌ Failed to add medication.');
    }
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Medication Reminders</h3>

        {message && <Alert variant="info">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Medication Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Dosage (e.g., 500mg)</Form.Label>
                <Form.Control
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Schedule (e.g., 8:00 AM)</Form.Label>
                <Form.Control
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">Add Medication</Button>
        </Form>

        <hr />

        <h5 className="mt-4">Current Medications</h5>
        {medications.length === 0 ? (
          <p>No medications added yet.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, idx) => (
                <tr key={idx}>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.schedule}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}

export default Medications;
