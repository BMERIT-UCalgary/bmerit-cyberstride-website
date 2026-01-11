import React, {useState} from 'react';
import { useBluetoothContext } from "../components/BLE/BluetoothContext.jsx";
import { useNavigate } from 'react-router-dom';
import bluetoothIcon from '../public/bluetoothicon2.svg'
import sensorIcon from "../public/sensorIcon.svg"


function BluetoothConnect() {
  const {
    connectToDevice1,
    connectToDevice2,
    connectToDevice3,
    connectToDevice4,
    disconnectDevice1,
    disconnectDevice2,
    disconnectDevice3,
    disconnectDevice4,
    isConnected,
    notificationValues,
    downloadAsciiData,
    allAsciiData,
    hasFinished,
    sendReadCommandDevice1,
    sendReadCommandDevice2,
    sendReadCommandDevice3,
    sendReadCommandDevice4,
    sendWriteCommandDevice1,
    sendWriteCommandDevice2,
    sendWriteCommandDevice3,
    sendWriteCommandDevice4,
    sendCommand,
  } = useBluetoothContext();

  // new metronome state
  const [metronome, setMetronome] = useState(60);

  const allConnected =
    isConnected.device1 &&
    isConnected.device2 &&
    isConnected.device3 &&
    isConnected.device4;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-start mb-2 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h1 className="font-bold text-2xl mr-2">Setup Devices</h1>
        <img
          src={bluetoothIcon}
          alt="Bluetooth Icon"
          className="w-7 h-7 mt-1.5"
        />
      </div>

      <div className="bg-gray-100 rounded-lg p-2 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 h-fit text-left">
        <div className="flex flex-col gap-2">
          <DeviceButton connected={isConnected.device1} onClick={connectToDevice1} label="Right Hand Sensor" />
          <DeviceButton connected={isConnected.device2} onClick={connectToDevice2} label="Left Hand Sensor" />
          <DeviceButton connected={isConnected.device3} onClick={connectToDevice3} label="Right Wheel Sensor" />
          <DeviceButton connected={isConnected.device4} onClick={connectToDevice4} label="Left Wheel Sensor" />
        </div>
      </div>

      {/* Metronome BPM input */}
      <div className="mt-4 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 flex items-center">
        <label htmlFor="metronome" className="mr-2 text-lg">
          Metronome BPM:
        </label>
        <input
          id="metronome"
          type="number"
          min="0"
          value={metronome}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (Number.isInteger(val) && val >= 0) {
              setMetronome(val);
            }
          }}
          className="border rounded px-3 py-1 w-24 focus:outline-none"
        />
        <span className="ml-2 text-sm text-gray-500">
          (0 BPM stops the buzzer)
        </span>
      </div>
      <button onClick={() => {
        // Send metronome value to all connected devices
        console.log("Sending metronome command:", metronome);
        if (isConnected.device2) sendCommand("device2", metronome);
      }}>
        Send Metronome Command
      </button>
      
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <button
          className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
          onClick={() => navigate('/sessionstarted')}
        //disabled={!allConnected}
        >
          Start Session
        </button>

        <button
          onClick={downloadAsciiData}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Download CSVs
        </button>

        <button
          onClick={() => {
            sendReadCommandDevice1();
            sendReadCommandDevice2();
            sendReadCommandDevice3();
            sendReadCommandDevice4();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Begin Sequential READ
        </button>
       
        <button
          onClick={() => {
            sendWriteCommandDevice1();
            sendWriteCommandDevice2();
            sendWriteCommandDevice3();
            sendWriteCommandDevice4();
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Send WRITE to All
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-700 text-left w-full max-w-2xl">
        <Status label="Right Hand Sensor" value={notificationValues.device1} done={hasFinished.device1} />
        <Status label="Left Hand Sensor" value={notificationValues.device2} done={hasFinished.device2} />
        <Status label="Right Wheel Sensor" value={notificationValues.device3} done={hasFinished.device3} />
        <Status label="Left Wheel Sensor" value={notificationValues.device4} done={hasFinished.device4} />
      </div>
    </div>
  );
}

// Reusable device button
function DeviceButton({ connected, onClick, label }) {
  return (
    <button
      className={`flex items-center rounded-2xl h-20 px-4 ${connected
          ? "bg-green-500 text-white cursor-not-allowed"
          : "bg-gray-100 text-black hover:bg-gray-200"
        }`}
      onClick={onClick}
      disabled={connected}
    >
      <img src={sensorIcon} alt={label} className="w-7 h-7" />
      <span className="ml-3 text-lg">{label}</span>
    </button>
  );
}

// Reusable sensor status display
function Status({ label, value, done }) {
  return (
    <p>
      {label}: {value ?? "No data"} {done ? "✅ Finished" : ""}
    </p>
  );
}

export default BluetoothConnect;