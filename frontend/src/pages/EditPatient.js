import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/admin/patients/${id}`, { // Ensure the route matches your backend
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data);
      } catch (err) {
        console.error('Failed to fetch patient details', err);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/admin/patients/${id}`, patient, { // Ensure the route matches your backend
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        navigate('/patients');
      }
    } catch (err) {
      console.error('Failed to update patient', err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Patient</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default EditPatient;
