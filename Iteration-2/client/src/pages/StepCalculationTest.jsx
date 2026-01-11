import React, { useState } from 'react';
import { useStepCalculation } from '../hooks/useStepCalculation';

function StepCalculationTest() {
  const { 
    totalSteps, 
    sensor1Steps, 
    sensor2Steps,
    calculateSensor1Steps,
    calculateSensor2Steps,
    calculateTotalSteps
  } = useStepCalculation();

  const [processingStatus, setProcessingStatus] = useState('');
  
  // Handle sensor 1 file upload
  const handleSensor1FileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setProcessingStatus('Processing Sensor 1 file...');
    try {
      const steps = await calculateSensor1Steps(file);
      setProcessingStatus(`Sensor 1 processed: ${steps} steps detected`);
    } catch (error) {
      setProcessingStatus(`Error processing Sensor 1 file: ${error.message}`);
      console.error("Error processing sensor 1 file:", error);
    }
  };
  
  // Handle sensor 2 file upload
  const handleSensor2FileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setProcessingStatus('Processing Sensor 2 file...');
    try {
      const steps = await calculateSensor2Steps(file);
      setProcessingStatus(`Sensor 2 processed: ${steps} steps detected`);
    } catch (error) {
      setProcessingStatus(`Error processing Sensor 2 file: ${error.message}`);
      console.error("Error processing sensor 2 file:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Step Calculation Test</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Sensor 1</h2>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleSensor1FileUpload}
            style={{ marginBottom: '10px' }}
          />
          <div>Steps: <strong>{sensor1Steps}</strong></div>
        </div>
        
        <div style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Sensor 2</h2>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleSensor2FileUpload}
            style={{ marginBottom: '10px' }}
          />
          <div>Steps: <strong>{sensor2Steps}</strong></div>
        </div>
      </div>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Total Steps</h2>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '10px' 
        }}>
          {totalSteps}
        </div>
        <p>Upload both sensor files to calculate total steps</p>
      </div>
      
      {processingStatus && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e6f7ff', 
          borderLeft: '4px solid #1890ff',
          marginTop: '20px'
        }}>
          {processingStatus}
        </div>
      )}
    </div>
  );
}

export default StepCalculationTest;
