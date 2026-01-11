import React, { useState } from 'react';
import { useDistanceCalculation } from '../hooks/useDistanceCalculation';

function SpeedVsTimeTest() {
  const { speedVsTime } = useDistanceCalculation();
  const [chartData, setChartData] = useState(null);
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const data = await speedVsTime(file);
      setChartData(data);
      console.log("Speed vs time data:", data);
    } catch (error) {
      console.error("Error extracting speed vs time data:", error);
    }
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Speed vs Time Test</h1>
      
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
          <h2>Speed Data Points:</h2>
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
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Time</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Speed</th>
                </tr>
              </thead>
              <tbody>
                {chartData[0].data.map((point, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.x}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.y.toFixed(4)}</td>
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

export default SpeedVsTimeTest;
