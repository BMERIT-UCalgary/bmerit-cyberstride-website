import React, { useState } from 'react';
import { useStepLengthCalculation } from '../hooks/useStepLengthCalculations';
import { useDistanceCalculation } from '../hooks/useDistanceCalculation';
import { useStepCalculation } from '../hooks/useStepCalculation';

function StepLengthTest() {
  const { stepLength, calculateStepLength, distance, totalSteps } = useStepLengthCalculation();
  const { calculateDistance } = useDistanceCalculation();
  const { calculateSensor1Steps, calculateSensor2Steps } = useStepCalculation();
  
  const [wheelFile, setWheelFile] = useState(null);
  const [leftStepFile, setLeftStepFile] = useState(null);
  const [rightStepFile, setRightStepFile] = useState(null);
  const [customDistance, setCustomDistance] = useState("");
  const [customSteps, setCustomSteps] = useState("");
  const [manualStepLength, setManualStepLength] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');

  // Handle wheel sensor file upload for distance
  const handleWheelFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setWheelFile(file);
    setProcessingStatus('Processing wheel data for distance...');
    
    try {
      await calculateDistance(file);
      setProcessingStatus('Wheel data processed successfully.');
    } catch (error) {
      setProcessingStatus(`Error processing wheel data: ${error.message}`);
    }
  };

  // Handle step sensor files upload
  const handleLeftStepFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLeftStepFile(file);
    setProcessingStatus('Processing left step sensor data...');
    
    try {
      await calculateSensor1Steps(file);
      setProcessingStatus('Left step data processed successfully.');
    } catch (error) {
      setProcessingStatus(`Error processing left step data: ${error.message}`);
    }
  };

  const handleRightStepFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setRightStepFile(file);
    setProcessingStatus('Processing right step sensor data...');
    
    try {
      await calculateSensor2Steps(file);
      setProcessingStatus('Right step data processed successfully.');
    } catch (error) {
      setProcessingStatus(`Error processing right step data: ${error.message}`);
    }
  };

  // Manual calculation
  const handleManualCalculation = () => {
    if (customDistance && customSteps) {
      const distVal = parseFloat(customDistance);
      const stepsVal = parseFloat(customSteps);
      
      if (!isNaN(distVal) && !isNaN(stepsVal) && stepsVal > 0) {
        const result = calculateStepLength(distVal, stepsVal);
        setManualStepLength(result);
        setProcessingStatus('Manual calculation completed.');
      } else {
        setProcessingStatus('Please enter valid numbers for distance and steps.');
      }
    } else {
      setProcessingStatus('Please enter both distance and steps values.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Step Length Calculation Test</h1>
      
      {/* Automatic calculation section */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2>Automatic Calculation</h2>
        <p>Upload sensor files to calculate step length automatically</p>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>Distance Data (Wheel Sensor)</h3>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleWheelFileUpload}
              style={{ marginBottom: '10px' }}
            />
            {wheelFile && (
              <p>Selected file: {wheelFile.name}</p>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <h3>Left Step Sensor</h3>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleLeftStepFileUpload}
              style={{ marginBottom: '10px' }}
            />
            {leftStepFile && (
              <p>Selected file: {leftStepFile.name}</p>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <h3>Right Step Sensor</h3>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleRightStepFileUpload}
              style={{ marginBottom: '10px' }}
            />
            {rightStepFile && (
              <p>Selected file: {rightStepFile.name}</p>
            )}
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#e0e0e0',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>Results</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <p><strong>Distance:</strong> {distance.toFixed(3)} meters</p>
            </div>
            <div style={{ flex: 1 }}>
              <p><strong>Total Steps:</strong> {totalSteps}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p><strong>Step Length:</strong> {stepLength.toFixed(3)} meters</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Manual calculation section */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2>Manual Calculation</h2>
        <p>Enter values manually to calculate step length</p>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label>
              Distance (meters):
              <input 
                type="number" 
                value={customDistance} 
                onChange={(e) => setCustomDistance(e.target.value)}
                step="0.01"
                min="0"
                style={{ 
                  marginLeft: '10px', 
                  padding: '5px', 
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </label>
          </div>
          
          <div style={{ flex: 1 }}>
            <label>
              Total Steps:
              <input 
                type="number" 
                value={customSteps} 
                onChange={(e) => setCustomSteps(e.target.value)}
                min="1"
                style={{ 
                  marginLeft: '10px', 
                  padding: '5px', 
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </label>
          </div>
          
          <div style={{ flex: 1 }}>
            <button 
              onClick={handleManualCalculation}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#4CAF50', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Calculate
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#e0e0e0',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>Manual Result</h3>
          <p><strong>Step Length:</strong> {manualStepLength.toFixed(3)} meters</p>
        </div>
      </div>
      
      {/* Status section */}
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

export default StepLengthTest;
