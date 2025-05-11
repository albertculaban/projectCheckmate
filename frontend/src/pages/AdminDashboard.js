// src/pages/AdminDashboard.js
import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
  if (!user || user.role !== 'admin') {
    navigate('/unauthorized'); // Or redirect to login
  }
}, [user, navigate]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Welcome, {user?.name || 'Admin'}</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Patients</Card.Title>
              <Card.Text>View and manage patient records.</Card.Text>
              <Button onClick={() => navigate('/patients')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text>See upcoming appointments and schedules.</Card.Text>
              <Button onClick={() => navigate('/appointments')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Education Library</Card.Title>
              <Card.Text>Manage and assign educational content.</Card.Text>
              <Button onClick={() => navigate('/education')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
