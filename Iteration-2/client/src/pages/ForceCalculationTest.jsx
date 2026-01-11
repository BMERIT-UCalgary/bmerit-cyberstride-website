import React from 'react';
import { useForceCalculation } from '../hooks/useForceCalculation';

export default function ForceTestPage() {
  const {
    leftSensorData,
    rightSensorData,
    processLeftSensor,
    processRightSensor,
  } = useForceCalculation(0);

  const handleLeftChange = (e) => {
    const file = e.target.files[0];
    if (file) processLeftSensor(file);
  };

  const handleRightChange = (e) => {
    const file = e.target.files[0];
    if (file) processRightSensor(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Force Sensor Test Page</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Left Sensor CSV:
          <input type="file" accept=".csv" onChange={handleLeftChange} />
        </label>
        <br />
        <label>
          Right Sensor CSV:
          <input type="file" accept=".csv" onChange={handleRightChange} />
        </label>
      </div>

      <div>
        <h3>Left Sensor Data</h3>
        <pre>{JSON.stringify(leftSensorData, null, 2)}</pre>
      </div>

      <div>
        <h3>Right Sensor Data</h3>
        <pre>{JSON.stringify(rightSensorData, null, 2)}</pre>
      </div>
    </div>
  );
}
