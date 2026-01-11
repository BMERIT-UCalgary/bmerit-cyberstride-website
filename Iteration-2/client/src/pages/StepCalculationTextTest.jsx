import React, { useState, useEffect } from 'react';
import { useStepCalculation } from '../hooks/useStepCalculation';

// Sample CSV text data for testing
const leftSensorSample = `timestamp,value1,value2
0.1,1
0.2,1
0.3,1
0.4,1`;

const rightSensorSample = `timestamp,value1,value2
0.1,0,1
0.2,1,0
0.3,0,0
0.4,1,0
0.5,0,0
0.6,1,0
0.6,1,0
0.6,1,0
0.6,0,0
0.7,1,0`;

function StepCalculationTextTest() {
  const { 
    totalSteps, 
    sensor1Steps, 
    sensor2Steps, 
    calculateSensor1Steps, 
    calculateSensor2Steps, 
    calculateTotalSteps 
  } = useStepCalculation();
  
  const [leftSensorText, setLeftSensorText] = useState(leftSensorSample);
  const [rightSensorText, setRightSensorText] = useState(rightSensorSample);

  useEffect(() => {
    // Initial calculation on component mount
    calculateSensor1Steps(leftSensorText);
    calculateSensor2Steps(rightSensorText);
  }, []);
  
  const handleLeftSensorChange = (e) => {
    const newText = e.target.value;
    setLeftSensorText(newText);
    calculateSensor1Steps(newText);
  };
  
  const handleRightSensorChange = (e) => {
    const newText = e.target.value;
    setRightSensorText(newText);
    calculateSensor2Steps(newText);
  };
  
  const handleCalculateBoth = () => {
    calculateTotalSteps(leftSensorText, rightSensorText);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Step Calculation Test (CSV Text)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">Left Sensor (Sensor 1)</h2>
          <textarea 
            className="w-full h-40 border p-2 mb-2 font-mono text-sm" 
            value={leftSensorText} 
            onChange={handleLeftSensorChange}
          />
          <p className="text-lg font-semibold">Steps: {sensor1Steps}</p>
        </div>
        
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">Right Sensor (Sensor 2)</h2>
          <textarea 
            className="w-full h-40 border p-2 mb-2 font-mono text-sm" 
            value={rightSensorText} 
            onChange={handleRightSensorChange}
          />
          <p className="text-lg font-semibold">Steps: {sensor2Steps}</p>
        </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={handleCalculateBoth}
        >
          Calculate Total Steps
        </button>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow text-center">
        <h2 className="text-xl font-bold">Results</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">Total Steps: {totalSteps}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">How This Works:</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>Left sensor (Sensor 1) simply counts rows in the CSV (minus header)</li>
          <li>Right sensor (Sensor 2) looks for patterns where a "1" in the middle column follows a "0" in the row above</li>
          <li>Total steps is the sum of both sensors</li>
          <li>Edit the CSV text in either box to see immediate recalculation</li>
        </ul>
      </div>
    </div>
  );
}

export default StepCalculationTextTest;
