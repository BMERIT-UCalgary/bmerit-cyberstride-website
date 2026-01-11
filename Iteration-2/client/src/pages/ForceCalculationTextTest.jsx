import React, { useState, useEffect } from 'react';
import { useForceCalculation } from '../hooks/useForceCalculation';
import { ResponsiveLine } from '@nivo/line';

// Sample force CSV data
const leftForceSample = `timestamp,force,event
0.1,0,1
0.2,0,1
0.3,0,1
0.4,0,1
0.5,90,1
0.6,0,1`;

const rightForceSample = `timestamp,force,event
0.1,55,1
0.2,75,1
0.3,95,1
0.4,115,1
0.5,95,1
0.6,65,1`;

function ForceCalculationTextTest() {
  const { 
    leftSensorData, 
    rightSensorData, 
    processLeftSensor, 
    processRightSensor, 
    processBothSensors,
    extractDataFromText
  } = useForceCalculation();
  
  const [leftForceText, setLeftForceText] = useState(leftForceSample);
  const [rightForceText, setRightForceText] = useState(rightForceSample);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    // Process both sensor data on initial load
    processBothSensors(leftForceText, rightForceText);
  }, []);
  
  const handleLeftForceChange = (e) => {
    const newText = e.target.value;
    setLeftForceText(newText);
    processLeftSensor(newText);
  };
  
  const handleRightForceChange = (e) => {
    const newText = e.target.value;
    setRightForceText(newText);
    processRightSensor(newText);
  };
  
  const handleProcessBoth = () => {
    processBothSensors(leftForceText, rightForceText);
  };

  // Force chart component
  const ForceChart = ({ data, title }) => {
    if (!data || !data[0] || !data[0].data || data[0].data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    return (
      <div className="h-full">
        <h3 className="text-center font-semibold mb-2">{title}</h3>
        <div style={{ height: `${chartHeight}px` }} className="border rounded-lg">
          <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ 
              type: 'linear', 
              min: 'auto', 
              max: 'auto' 
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Time (s)',
              legendOffset: 40,
              legendPosition: 'middle'
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Force (%)',
              legendOffset: -50,
              legendPosition: 'middle'
            }}
            enablePoints={true}
            pointSize={8}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableGridX={false}
            colors={{ scheme: 'category10' }}
            enableSlices="x"
            useMesh={true}
            animate={true}
            curve="monotoneX"
            lineWidth={3}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Force Calculation Test (CSV Text)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">Left Force Sensor</h2>
          <textarea 
            className="w-full h-40 border p-2 mb-4 font-mono text-sm" 
            value={leftForceText} 
            onChange={handleLeftForceChange}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => processLeftSensor(leftForceText)}
          >
            Process Left Sensor
          </button>
        </div>
        
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">Right Force Sensor</h2>
          <textarea 
            className="w-full h-40 border p-2 mb-4 font-mono text-sm" 
            value={rightForceText} 
            onChange={handleRightForceChange}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => processRightSensor(rightForceText)}
          >
            Process Right Sensor
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          onClick={handleProcessBoth}
        >
          Process Both Sensors
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Chart Height:</label>
        <input 
          type="range" 
          min="200" 
          max="600" 
          value={chartHeight} 
          onChange={(e) => setChartHeight(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center text-sm text-gray-500">{chartHeight}px</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg shadow">
          <ForceChart data={leftSensorData} title="Left Force" />
        </div>
        <div className="border p-4 rounded-lg shadow">
          <ForceChart data={rightSensorData} title="Right Force" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">How This Works:</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>The hook converts CSV data with force values to chart-ready data points</li>
          <li>Force values in the second column are normalized (value/128*100)</li>
          <li>The x-axis shows time, and the y-axis shows force percentage</li>
          <li>Edit the CSV text in either box and process to see chart updates</li>
          <li>Try adding more data points to see how the chart responds</li>
        </ul>
      </div>
    </div>
  );
}

export default ForceCalculationTextTest;
