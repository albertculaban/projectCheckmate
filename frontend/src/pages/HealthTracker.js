import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { addHealthLog, getHealthLogs } from '../api/api';
import HealthLogChart from '../components/HealthLogChart';

function HealthTracker() {
  const [formData, setFormData] = useState({
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    oxygenSaturation: '',
    bloodGlucose: '',
  });

  const [feedback, setFeedback] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const [submitted, setSubmitted] = useState(false);
  const [healthLogs, setHealthLogs] = useState([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id;


  const fetchLogs = async () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id;

  if (!userId) {
    console.error('User ID not found.');
    return;
  }

    try {
      const logs = await getHealthLogs(userId);
      const formatted = logs.map(log => ({
        ...log,
        date: new Date(log.createdAt).toLocaleDateString(),
        bloodGlucose: Number(log.bloodGlucose),
        heartRate: Number(log.heartRate),
        temperature: Number(log.temperature),
      }));
      setHealthLogs(formatted);
    } catch (error) {
      console.error('Failed to load health logs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');
    setSubmitted(false);

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id;

      if (!userId) {
        console.error('User ID is not available');
        return; // Don't submit if no user ID
      }

     console.log("Form data:", formData); // Check the data here

    try {
      await addHealthLog({ ...formData, patientId: userId });
      await fetchLogs();
      setSubmitted(true);
      analyzeData();
      setFormData({
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        temperature: '',
        oxygenSaturation: '',
        bloodGlucose: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setFeedback('Failed to submit data.');
      setAlertVariant('danger');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const analyzeData = () => {
    const systolic = parseInt(formData.bloodPressure?.split('/')[0], 10);
    const glucose = parseInt(formData.bloodGlucose, 10);
    let message = '';
    let variant = 'info';

    if (systolic >= 140) {
      message += '⚠️ Your blood pressure is elevated. Watch this [video on hypertension](https://www.youtube.com/watch?v=example). ';
      variant = 'warning';
    }

    if (glucose >= 180) {
      message += '⚠️ Your glucose is high. Consider reviewing your insulin intake or watching a diet video. ';
      variant = 'warning';
    }

    if (message) {
      setFeedback(message);
      setAlertVariant(variant);
    } else {
      setFeedback('✅ All vitals look good. Keep it up!');
      setAlertVariant('success');
    }
  };

  const getInputColor = (name, value) => {
    const val = parseFloat(value);
    switch (name) {
      case 'heartRate':
        return val < 60 || val > 100 ? 'is-invalid' : 'is-valid';
      case 'temperature':
        return val < 36 || val > 37.5 ? 'is-invalid' : 'is-valid';
      case 'oxygenSaturation':
        return val < 95 ? 'is-invalid' : 'is-valid';
      case 'bloodGlucose':
        return val < 70 || val > 180 ? 'is-invalid' : 'is-valid';
      default:
        return '';
    }
  };
  
  console.log('Form Data:', formData);
  console.log('Patient ID:', userId);


  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Health Tracker</h3>

        {submitted && (
          <Alert variant={alertVariant} className="mt-3">
            <div dangerouslySetInnerHTML={{ __html: feedback }} />
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Blood Pressure (e.g. 120/80)</Form.Label>
                <Form.Control
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Heart Rate (bpm)</Form.Label>
                <Form.Control
                  name="heartRate"
                  type="number"
                  value={formData.heartRate}
                  onChange={handleChange}
                  className={getInputColor('heartRate', formData.heartRate)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Respiratory Rate (breaths/min)</Form.Label>
                <Form.Control
                  name="respiratoryRate"
                  type="number"
                  value={formData.respiratoryRate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Body Temperature (°C)</Form.Label>
                <Form.Control
                  name="temperature"
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={handleChange}
                  className={getInputColor('temperature', formData.temperature)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Oxygen Saturation (%)</Form.Label>
                <Form.Control
                  name="oxygenSaturation"
                  type="number"
                  value={formData.oxygenSaturation}
                  onChange={handleChange}
                  className={getInputColor('oxygenSaturation', formData.oxygenSaturation)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Blood Glucose (mg/dL)</Form.Label>
                <Form.Control
                  name="bloodGlucose"
                  type="number"
                  value={formData.bloodGlucose}
                  onChange={handleChange}
                  className={getInputColor('bloodGlucose', formData.bloodGlucose)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Submit Health Data
          </Button>
        </Form>

        {submitted && (
          <div className="mt-4">
            <h4>Summary of Health Logs</h4>
            <Row>
              <Col md={6}><p><strong>Blood Pressure:</strong> {formData.bloodPressure}</p></Col>
              <Col md={6}><p><strong>Heart Rate:</strong> {formData.heartRate} bpm</p></Col>
            </Row>
            <Row>
              <Col md={6}><p><strong>Respiratory Rate:</strong> {formData.respiratoryRate} breaths/min</p></Col>
              <Col md={6}><p><strong>Body Temperature:</strong> {formData.temperature} °C</p></Col>
            </Row>
            <Row>
              <Col md={6}><p><strong>Oxygen Saturation:</strong> {formData.oxygenSaturation} %</p></Col>
              <Col md={6}><p><strong>Blood Glucose:</strong> {formData.bloodGlucose} mg/dL</p></Col>
            </Row>
          </div>
        )}

        {/* Graph of logged health data */}
        {healthLogs.length > 0 && (
          <div className="mt-5">
            <h4>Health Trends</h4>
            <HealthLogChart data={healthLogs} />
          </div>
        )}
      </Card>
    </div>
  );
}

export default HealthTracker;
