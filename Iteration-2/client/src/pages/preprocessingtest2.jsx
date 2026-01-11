import React from 'react';
import { useDistanceCalculation } from '../hooks/useDistanceCalculation';

function PreprocessingTest2() {
  const { 
    circumference, 
    setCircumference, 
    distance,
    time,
    speed,
    calculateDistance 
  } = useDistanceCalculation();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
      // This will calculate the distance, time and speed
    const result = await calculateDistance(file);
    console.log(`The calculated values are:`, result);
    console.log(`Distance: ${result.distance} cm`);
    console.log(`Time: ${result.time} seconds`);
    console.log(`Speed: ${result.speed} cm/s`);
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <label>
        Wheel Circumference (m):
        <input 
          type="number" 
          value={circumference} 
          onChange={(e) => setCircumference(parseFloat(e.target.value))} 
          step="any"
        />
      </label>      <br />
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>Calculation Results</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
            <h3>Distance</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{distance.toFixed(2)} m</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
            <h3>Time</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{time.toFixed(2)} seconds</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px', gridColumn: 'span 2' }}>
            <h3>Speed</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{speed.toFixed(2)} m/s</p>
            <p>({(speed * 0.036).toFixed(2)} km/h)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreprocessingTest2;