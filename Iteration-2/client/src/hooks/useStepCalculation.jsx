import { useState } from 'react';

export function useStepCalculation() {
  // State to track steps
  const [totalSteps, setTotalSteps] = useState(0);
  const [sensor1Steps, setSensor1Steps] = useState(0);
  const [sensor2Steps, setSensor2Steps] = useState(0);
  
  // Function to process steps from text (left sensor)
  const processStepsFromText = (csvText) => {
    if (!csvText) return 0;
    
    const lines = csvText.trim().split('\n');
    
    // Count rows (excluding header)
    const stepsCount = Math.max(0, lines.length - 1);
    return stepsCount;
  };
  
  // Function to process steps from right sensor text with specific conditions
  const processSensorStepsFromText = (csvText) => {
    if (!csvText) return 0;
    
    const lines = csvText.trim().split('\n');
    let stepsCount = 0;
    
    // Start from index 1 to check one row above
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      
      // Check if row has at least 3 columns
      if (row.length < 3) continue;
      
      // Condition 1: Middle column (index 1) must be 1
      const middleColumnValue = row[1].trim();
      
      // Get the row above for condition 2
      const rowAbove1 = lines[i-1].split(',');
      
      // Condition 2: Row above must have 0 in middle column
      const isRowAbove1Zero = rowAbove1.length > 1 && rowAbove1[1].trim() === "0";
      
      // Count a step only if both conditions are met
      if (middleColumnValue === "1" && isRowAbove1Zero) {
        stepsCount++;
      }
    }
    
    return stepsCount;
  };
  
  // Function to calculate steps from sensor 1
  const calculateSensor1Steps = (csvText) => {
    if (!csvText) return Promise.resolve(0);
    
    const steps = processSensorStepsFromText(csvText);
    setSensor1Steps(steps);
    updateTotalSteps(steps, sensor2Steps);
    return Promise.resolve(steps);
  };
  
  // Function to calculate steps from sensor 2
  const calculateSensor2Steps = (csvText) => {
    if (!csvText) return Promise.resolve(0);
    
    const steps = processSensorStepsFromText(csvText);
    setSensor2Steps(steps);
    updateTotalSteps(sensor1Steps, steps);
    return Promise.resolve(steps);
  };
  // Function to calculate total steps from both sensors
  const calculateTotalSteps = (csvText1, csvText2) => {
    if (!csvText1 || !csvText2) return Promise.resolve(0);
    
    return Promise.all([
      calculateSensor1Steps(csvText1),
      calculateSensor2Steps(csvText2)
    ]).then(([steps1, steps2]) => {
      const total = steps1 + steps2;
      setTotalSteps(total);
      return total;
    });
  };
  
  // Helper function to update total steps
  const updateTotalSteps = (steps1, steps2) => {
    setTotalSteps(steps1 + steps2);
  };
  
  return {
    // State values
    totalSteps,
    sensor1Steps,
    sensor2Steps,
    
    // Functions
    calculateSensor1Steps,
    calculateSensor2Steps,
    calculateTotalSteps,
    
    // Direct text processing functions
    processStepsFromText,
    processRightSensorStepsFromText: processSensorStepsFromText
  };
}
