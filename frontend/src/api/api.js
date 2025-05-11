import axios from 'axios';

const API_URL = '/api'; // ✅ Relative path that works in both dev & prod

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const getHealthLogs = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/health`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMedications = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/medications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addMedication = async (medicationData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/medications`, medicationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAppointments = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addAppointment = async (appointmentData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addHealthLog = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/health`, {
    bloodPressure: data.bloodPressure,
    heartRate: parseFloat(data.heartRate),
    respiratoryRate: parseFloat(data.respiratoryRate),
    temperature: parseFloat(data.temperature),
    oxygenSaturation: parseFloat(data.oxygenSaturation),
    bloodGlucose: parseFloat(data.bloodGlucose),
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
