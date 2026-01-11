import { useState } from 'react';

export function useDistanceCalculation() {
  const [circumference, setCircumference] = useState(0.5985);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null); // Kept for compatibility
  const [xyData, setXyData] = useState([]);

  const calculateDistanceFromText = (csvText, customCircumference = circumference) => {

    if (!csvText) return { distance: 0, time: 0, speed: 0 };

    const lines = csvText.trim().split('\n');
    let dist = 0;

    for (let i = 0; i < lines.length; i++) {
      const row = lines[i].split(',');
      // Check if the last column has a value of 1
      if (row.length > 0 && row[row.length - 1].trim() === "0") {
        dist += parseFloat(customCircumference || 0);
      }
    }    // Calculate time from the timestamp in the last row
    let timeValue = 0;
    for (let i = lines.length - 1; i >= 1; i--) { // Start from the last row and work backwards
      const row = lines[i].split(',');
      if (row.length >= 3 && row[2].trim() === "0") { // Check third column (index 2) for value "1"
        timeValue = parseFloat(row[0]) / 1000; // Get timestamp from first column and convert from ms to seconds
        break; // Stop after finding the first match (which is the last row with value 1)
      }
    }

    let speedValue = 0;
    if (timeValue > 0) {
      speedValue = (dist / timeValue);
    }

    setDistance(dist);
    setTime(timeValue);
    setSpeed(speedValue);

    return {
      distance: dist,
      time: timeValue,
      speed: speedValue
    };
  };

  const calculateSpeed = () => {
    if (time > 0) {
      const calculatedSpeed = (distance / time);
      setSpeed(calculatedSpeed);
      return calculatedSpeed;
    }
    return 0;
  };

  const distanceVsTimeFromText = (csvText, customCircumference = circumference) => {
    if (!csvText) return Promise.resolve([]);

    return new Promise((resolve) => {
      const lines = csvText.trim().split('\n');
      const dataPoints = [];
      let cumulativeDistance = 0;

      for (let i = 0; i < lines.length; i++) {        const row = lines[i].split(',');
        if (row.length < 2) continue;

        if (row.length > 0 && row[row.length - 1].trim() === "1") {
          cumulativeDistance += parseFloat(customCircumference || 0);
        }

        const timeInSeconds = parseFloat(row[0]) / 1000; // Convert from ms to seconds
        const x = timeInSeconds.toFixed(1) + "s"; // Time in seconds with "s" suffix
        const y = cumulativeDistance;  // Use cumulative distance as Y value
        
        if (!isNaN(y)) {
          dataPoints.push({ x, y });
        }
      }

      const chartData = [{
        id: "distance",
        data: dataPoints
      }];

      setXyData(chartData);
      resolve(chartData);
    });
  };

  const speedVsTimeFromText = (csvText, customCircumference = circumference) => {
    if (!csvText) return Promise.resolve([]);

    return new Promise((resolve) => {
      const lines = csvText.trim().split('\n');
      const dataPoints = [];
      let cumulativeDistance = 0;
      let previousTime = null;

        for (let i = 0; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row.length < 2) continue;
        
        const currentTimeMs = parseFloat(row[0]);
        const currentTime = currentTimeMs / 1000; // Convert from ms to seconds
        
        // Only add distance if the last column has a value of 1
        if (row.length > 0 && row[row.length - 1].trim() === "1") {
          cumulativeDistance += parseFloat(customCircumference || 0);
        }
        
        // Format time for display
        const x = currentTime.toFixed(1) + "s"; // Time in seconds with "s" suffix
          // Calculate speed for all points
        let y = 0;
        if (previousTime !== null) {
          // For subsequent points - instantaneous speed between time intervals
          y = parseFloat(customCircumference) / (currentTime - previousTime);
        } else {
          // For the first point - average speed from start to first data point
          y = parseFloat(customCircumference) / currentTime;
        }
        
        if (!isNaN(y)) {
          dataPoints.push({ x, y });
        }
        
        // Update previous time for next calculation
        previousTime = currentTime;
      }
      
      // Format for Nivo chart
      const chartData = [{
        id: "speed",
        data: dataPoints
      }];
      
      // We don't update state here as this is a separate view
      resolve(chartData);
    });
  };

  return {
    // State values
    circumference,
    distance,
    speed,
    time,
    uploadedFile,
    xyData,

    // Setters
    setCircumference,
    setDistance,
    setSpeed,
    setTime,

    // Functions
    calculateDistanceFromText,
    calculateSpeed,
    distanceVsTimeFromText,
    speedVsTimeFromText
  };
}
