import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HealthTracker from './pages/HealthTracker';
import Medications from './pages/Medications';
import Appointments from './pages/Appointment';
import EducationLibrary from './pages/EducationalLibrary';
import Patients from './pages/Patients';
import EditPatient from './pages/EditPatient';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tracker" element={<HealthTracker />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/education" element={<EducationLibrary />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/edit/:id" element={<EditPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
