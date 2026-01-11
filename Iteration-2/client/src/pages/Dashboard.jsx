import { useState, useEffect } from 'react'
import WideMetricPanel from '../components/dashboard/WideMetricPanel.jsx'
import TallMetricPanel from '../components/dashboard/TallMetricPanel.jsx'
import Background from '../components/generic/Background.jsx'
import ChartPanel from '../components/dashboard/ChartPanel.jsx'
import { useNavigate } from 'react-router-dom';
// import { useCSV } from '../hooks/DataContext.jsx'
import { useDistanceCalculation } from '../hooks/useDistanceCalculation.jsx'
import { useStepCalculation } from '../hooks/useStepCalculation.jsx'
import { useStepLengthCalculation } from '../hooks/useStepLengthCalculations.js'
import { useBluetooth } from '../components/BLE/ble.jsx'
import { useForceCalculation } from '../hooks/useForceCalculation.jsx'
import { ResponsiveLine } from '@nivo/line';
import { useBluetoothContext } from '../components/BLE/BluetoothContext.jsx'

function Dashboard() {

  // IMPORTANT: This is the fix to state access: destructure from the global context provider
  const { allAsciiData } = useBluetoothContext();
  const [chartTitle, setChartTitle] = useState("Right Hand Force")
  const [chartData, setChartData] = useState("")

  // const { csvData } = useCSV();
  const {
    totalSteps,
    calculateSensor1Steps,
    calculateSensor2Steps,
    calculateTotalSteps
  } = useStepCalculation();
  const {
    circumference,
    setCircumference,
    distance,
    time,
    speed,
    setDistance,
    setTime,
    setSpeed,
    calculateDistanceFromText,
    calculateSpeed
  } = useDistanceCalculation();

  const navigate = useNavigate();

  const { stepLength } = useStepLengthCalculation(distance, totalSteps);


  /**
   * Distance calculation stuff
   */

  useEffect(() => {
    const processDistance = async () => {
      if (allAsciiData) {
        const distanceData = allAsciiData['device3']
        console.log("Distance Data: ", distanceData)
        const result = await calculateDistanceFromText(distanceData);

        console.log("Distance Result: ", result)
      }
    };
    processDistance();
  }, [allAsciiData]);

    useEffect(() => {
      const processSteps = async () => {
        if (!allAsciiData) return;

        const stepData = allAsciiData['device3'];
        const steps = await calculateSensor1Steps(stepData);
        console.log("Steps Result:", steps);
      };

      processSteps();
    }, [allAsciiData, calculateSensor1Steps]);

  /**
   * Left and Right pressure sensor calculation stuff
   */

  const {
    leftSensorData,
    rightSensorData,
    processLeftSensor,
    processRightSensor,
    processBothSensors,
    extractDataFromText
  } = useForceCalculation();


useEffect(() => {

  console.log("Invoke parent")

  if (!allAsciiData) return;

  const getData = async () => {
    const rightForceData = allAsciiData['device1'];
    const leftForceData = allAsciiData['device2'];

    console.log("Right", rightForceData);

    // Comment out dynamic processing for now
    // let [left, right] = await processBothSensors(leftForceData, rightForceData);

    // Hardcoded fake force data (simulated for ~15 seconds)
    const fakeRight = [
      {
        id: "Right Hand Force",
        data: [
          { x: "0s", y: 0 },
          { x: "1000s", y: 5 },
          { x: "2000s", y: 12 },
          { x: "3000s", y: 48 },   // press starts
          { x: "4000s", y: 80 },
          { x: "5000s", y: 82 },   // hold steady
          { x: "6000s", y: 81 },
          { x: "7000s", y: 50 },   // release
          { x: "8000s", y: 15 },
          { x: "9000s", y: 8 },    // rest
          { x: "10000s", y: 20 },  // second press
          { x: "11000s", y: 60 },
          { x: "12000s", y: 88 },
          { x: "13000s", y: 90 },  // hold
          { x: "14000s", y: 70 },
          { x: "15000s", y: 10 }   // release
        ]
      }
    ];

    const fakeLeft = [
      {
        id: "Left Hand Force",
        data: [
          { x: "0s", y: 0 },
          { x: "1000s", y: 4 },
          { x: "2000s", y: 10 },
          { x: "3000s", y: 35 },   // press starts
          { x: "4000s", y: 65 },
          { x: "5000s", y: 63 },   // hold
          { x: "6000s", y: 60 },
          { x: "7000s", y: 32 },   // release
          { x: "8000s", y: 10 },
          { x: "9000s", y: 0 },    // rest
          { x: "10000s", y: 25 },  // second press
          { x: "11000s", y: 50 },
          { x: "12000s", y: 68 },
          { x: "13000s", y: 65 },  // hold
          { x: "14000s", y: 40 },
          { x: "15000s", y: 5 }    // release
        ]
      }
    ];

    if (chartTitle === "Right Hand Force") {
      setChartData(fakeRight);
      console.log("Right Chart Data ", fakeRight);
    } else if (chartTitle === "Left Hand Force") {
      setChartData(fakeLeft);
      console.log("Left Chart Data ", fakeLeft);
    } else {
      setChartData([...fakeLeft, ...fakeRight]);
      console.log("Bilateral Chart Data ", [...fakeLeft, ...fakeRight]);
    }
  };

  getData();
}, [allAsciiData, chartTitle]);


  return (
    <>
      <Background>
        {/* Grid 6x8 */}
        <div className='relative w-full h-full p-5 grid grid-cols-6 grid-rows-8 gap-8 '>
          <WideMetricPanel metricTitle={"Average Speed"} metricQuantity={0.24} units={"m/s"} />
          <WideMetricPanel metricTitle={"Distance"} metricQuantity={3.6} units={"m"} />
          <WideMetricPanel metricTitle={"Steps"} metricQuantity={8} />

          <ChartPanel data={chartData} title={chartTitle} setChartTitle={setChartTitle} />

          <TallMetricPanel metricTitle={"Step Length"} metricQuantity={0.45} shape={"tall"} units={"m"} />
          <TallMetricPanel metricTitle={"Metronome"} metricQuantity={"60"} shape={"tall"} units={"bpm"} />

          {/* Session Panel */}
          <div className='bg-gradient-to-tr from-green-200 to-blue-300 bg-opacity-85 backdrop-blur-lg rounded-lg row-span-3 col-span-2 min-h-[50px]'>
            <div className='flex flex-col h-full w-full p-5'>
              <p className='text-xl text-white h-1/3'>Session Duration</p>
              <div className='flex items-center h-full gap-2'>
                <p className='text-5xl text-white font-bold'>{15 + 's'}</p>
              </div>
              <div className='flex justify-end h-1/3 w-full'>
                <button className='flex justify-between items-center h-full w-fit p-1 px-3 bg-white rounded-xl'
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  End Session
                  <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </Background>
    </>
  )
}

export default Dashboard
