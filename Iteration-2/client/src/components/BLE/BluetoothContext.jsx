import { createContext, useContext, useEffect } from 'react';
import { useBluetooth } from './ble.jsx';

const BluetoothContext = createContext();

export function BluetoothProvider({ children }) {
  const bluetoothState = useBluetooth();

  useEffect(() => {
    console.log("bluetoothState ", bluetoothState);
  }, [bluetoothState]);

  return (
    <BluetoothContext.Provider value={bluetoothState}>
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetoothContext() {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error('useBluetoothContext must be used within a BluetoothProvider');
  }
  return context;
}
