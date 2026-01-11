import React, { useState } from 'react';
import { useDistanceCalculation } from '../hooks/useDistanceCalculation';

function XYExtractTest() {
  const { distanceVsTime } = useDistanceCalculation();
  const [chartData, setChartData] = useState(null);
    const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const data = await distanceVsTime(file);
      setChartData(data);
      console.log("Extracted data:", data);
    } catch (error) {
      console.error("Error extracting distance vs time data:", error);
    }
  };
    return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Distance vs Time Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Upload CSV File</h2>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload}
          style={{ marginBottom: '10px' }}
        />
      </div>
      
      {chartData && (
        <div>
          <h2>Extracted Data Points:</h2>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '5px',
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {JSON.stringify(chartData, null, 2)}
          </pre>
          
          <div style={{ marginTop: '20px' }}>
            <h2>Data Points Table:</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#eee' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>X (Time)</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Y (Value)</th>
                </tr>
              </thead>
              <tbody>
                {chartData[0]?.data.map((point, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{point.x}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{point.y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default XYExtractTest;
