import React, { useEffect, useState } from 'react';
import { Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getHealthLogs } from '../api/api';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import '../styles/PatientDashboard.css';
import { useLocation } from 'react-router-dom';

function PatientDashboard() {
  const [logs, setLogs] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const toggleChat = () => setShowChat(!showChat);

  useEffect(() => {
    if (location.pathname === '/dashboard'){
    introJs().setOptions({
      steps: [
        {
          intro: `
            <div class="tour-step">
              <img class="ai-avatar" src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png" alt="AI Assistant" />
              <p>Welcome to your dashboard! Let's take a tour.</p>
            </div>
          `
        },
        {
          element: '.log-health-section',
          intro: `
            <div class="tour-step">
              <p>Here you can log your health metrics.</p>
            </div>
          `
        },
        {
          element: '.medications-section',
          intro: `
            <div class="tour-step">
              <p>Check and manage your medications here.</p>
            </div>
          `
        },
        {
          element: '.appointments-section',
          intro: `
            <div class="tour-step">
              <p>View your upcoming appointments.</p>
            </div>
          `
        },
        {
          element: '.education-section',
          intro: `
            <div class="tour-step">
              <p>Access health education videos here.</p>
            </div>
          `
        }
      ]
    }).start();
  }
  }, [location.pathname]);

  console.log("IntroJS triggered on:", location.pathname);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const result = await getHealthLogs();
        setLogs(result);
      } catch (err) {
        console.log('Failed to load health logs');
      }
    };
    fetchLogs();
  }, []);

  return (
    <Container fluid className="dashboard-container">
      <div className="logout-container">
        <Button variant="outline-light" size="sm" onClick={() => {
          localStorage.removeItem('token'); // or whatever your logout logic is
          navigate('/');
        }}>
          Logout
        </Button>
      </div>

      <h3 className="dashboard">WELCOME TO YOUR</h3>
      <h2 className="dashboard-header mb-4">DASHBOARD</h2>

      {alertMessage && (
        <Alert variant="danger">{alertMessage}</Alert>
      )}
      
      <Row className="g-4 justify-content-start">
        <Col md="auto" className='me-1'>
        <div className='card-wrapper'>
          <Card className="feature-card tracker-card log-health-section">
            <Card.Body>
              <Card.Title>Health Tracker</Card.Title>
              <Card.Text>Log your vitals and view trends.</Card.Text>
              <Button onClick={() => navigate('/tracker')}>Open Tracker</Button>
            </Card.Body>
          </Card>
          </div>
        </Col>

        <Col md="auto" className='me-1'>
        <div className='card-wrapper'>
          <Card className="feature-card medications-card medications-section">
            <Card.Body>
              <Card.Title>Medications</Card.Title>
              <Card.Text>Check and manage medications.</Card.Text>
              <Button onClick={() => navigate('/medications')}>View Meds</Button>
            </Card.Body>
          </Card>
          </div>
        </Col>

        <Col md="auto" className='me-1'>
        <div className='card-wrapper'>
          <Card className="feature-card appointments-card appointments-section">
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text>Upcoming and past appointments.</Card.Text>
              <Button onClick={() => navigate('/appointments')}>View</Button>
            </Card.Body>
          </Card>
          </div>
        </Col>

        <Col md="auto" className='me-1'>
        <div className='card-wrapper'>
          <Card className="feature-card education-card education-section">
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <Card.Text>Watch health education videos.</Card.Text>
              <Button onClick={() => navigate('/education')}>Open Library</Button>
            </Card.Body>
          </Card>
          </div>
        </Col>
      </Row>

      {logs.length > 0 && (
        <Row className='mt-4'>
          <Col>
        <div className="summary-section">
          <h4>Health Summary</h4>
          <div className="summary-item">
            <strong>Last Entry:</strong> {new Date(logs[logs.length - 1].date).toLocaleDateString()}
          </div>
          <div className="summary-item">
            <strong>Latest BP:</strong> {logs[logs.length - 1].bloodPressure}
          </div>
          <div className="summary-item">
            <strong>Latest Glucose:</strong> {logs[logs.length - 1].glucose}
          </div>
          <div className="summary-item">
            <strong>Average Glucose:</strong> {
              (
                logs.reduce((sum, log) => sum + (parseFloat(log.glucose) || 0), 0) / logs.length
              ).toFixed(1)
            }
          </div>
        </div>
        </Col>
        </Row>
      )}

      <img src="/assets/Ai.png" alt="AI Assistant" className="ai-assistant-avatar" onClick={toggleChat}
      />

      {/* AI Chat Box */}
      {showChat && (
      <div className="ai-chatbox">
        <div className="chat-header">AI Assistant</div>
        <div className="chat-body">
          <p>Hi! I'm your AI assistant. How can I help you today?</p>
        </div>
        <div className="chat-footer">
          <input type="text" placeholder="Type a message..." disabled />
        </div>
      </div>
      )}
    </Container>
  );
}




export default PatientDashboard;
