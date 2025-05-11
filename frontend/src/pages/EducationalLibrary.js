import React from 'react';
import { Card, Row, Col, Container, Alert } from 'react-bootstrap';

const educationContent = [
  {
    title: 'Managing High Blood Pressure',
    description: 'Understand what hypertension is and how to manage it effectively.',
    videoUrl: 'http://localhost:5000/Videos/1.mp4',
  },
  {
    title: 'Controlling Blood Sugar with Diet',
    description: 'Learn how food impacts glucose levels for diabetics.',
    videoUrl: 'http://localhost:5000/Videos/2.mp4',
  },
  {
    title: 'Understanding Oxygen Saturation',
    description: 'How to monitor SpO2 levels and why they matter.',
    videoUrl: 'http://localhost:5000/Videos/3.mp4',
  },
];

function EducationLibrary() {
  return (
    <Container className="mt-4">
      <h3 className="mb-4">Education Library</h3>

      {educationContent.length === 0 && (
        <Alert variant="warning">
          No educational videos available at the moment.
        </Alert>
      )}

      <Row>
        {educationContent.map((item, idx) => (
          <Col key={idx} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div className="ratio ratio-16x9">
                  {item.videoUrl ? (
                    <video controls>
                      <source src={item.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Alert variant="danger">Video not available.</Alert>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EducationLibrary;
