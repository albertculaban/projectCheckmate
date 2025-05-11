import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import MainLayout from '../components/MainLayout';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        // Update this URL to include the backend server port (e.g., localhost:5000)
        const res = await axios.get('http://localhost:5000/api/users/patients', { // Full URL with the correct port
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch patients', err);
        setError('Failed to load patients');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);  // Empty dependency array means this runs once on component mount

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/patients/${id}`, { // Full URL with correct port
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Failed to delete patient', err);
      setError('Failed to delete patient');
    }
  };

  const handleEdit = (id) => {
    navigate(`/patients/edit/${id}`);
  };

  return (
    <Container className="mt-4">
      <h2>Registered Patients</h2>
      {/* <Button className="mb-3" onClick={() => navigate('/patients/add')}>
        + Add Patient
      </Button> */}

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(p._id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Patients;
