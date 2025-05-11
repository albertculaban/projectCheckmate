// frontend/src/components/HealthLogChart.js
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function HealthLogChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="heartRate" stroke="#007bff" name="Heart Rate (bpm)" />
        <Line type="monotone" dataKey="temperature" stroke="#dc3545" name="Temperature (°C)" />
        <Line type="monotone" dataKey="bloodGlucose" stroke="#28a745" name="Glucose (mg/dL)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default HealthLogChart;
