import { useEffect, useState } from 'react';

export function useForceCalculation() {
  const [leftSensorData, setLeftSensorData] = useState(0);
  const [rightSensorData, setRightSensorData] = useState(0);

  useEffect(() => {
    console.log("leftSensorData ", leftSensorData)
    console.log("rightSensorData ", rightSensorData)
  }, [leftSensorData, rightSensorData])


  // Function to extract data points from CSV text
  const extractDataFromText = (csvText, prefix) => {
    if (!csvText) return [];

    const lines = csvText.trim().split('\n');

    // Skip header row
    const dataPoints = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length < 2) continue;

      const x = parseFloat(row[0]).toFixed(1) + "s"; // Timestamp with "s" suffix
      const y = parseFloat(Math.round(row[1] / 128 * 100));  // Sensor value

      if (!isNaN(y)) {
        dataPoints.push({ x, y });
      }
    }

    // Format for Nivo chart
    return [{
      id: `${prefix}Force`,
      data: dataPoints
    }];
  };

  // Function to process left sensor data
  const processLeftSensor = (csvText) => {
    if (!csvText) return Promise.resolve([]);

    const data = extractDataFromText(csvText, "left");

    setLeftSensorData(data);
    return Promise.resolve(data);
  };

  // Function to process right sensor data
  const processRightSensor = (csvText) => {
    if (!csvText) return Promise.resolve([]);

    const data = extractDataFromText(csvText, "right");
    setRightSensorData(data);
    return Promise.resolve(data);
  };

  // Process both sensors at once
  const processBothSensors = (leftCsvText, rightCsvText) => {
    return Promise.all([
      processLeftSensor(leftCsvText),
      processRightSensor(rightCsvText)
    ]);
  };

  return {
    // State values
    leftSensorData,
    rightSensorData,

    // Functions
    processLeftSensor,
    processRightSensor,
    processBothSensors,

    // Direct text processing function
    extractDataFromText
  };
}
