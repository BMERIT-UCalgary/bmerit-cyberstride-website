async function scanBluetoothDevices() {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth is not supported on this browser.');
      return;
    }
  
    try {
      console.log('Scanning for Bluetooth devices...');
  
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,  // Scan for all devices
        optionalServices: ['battery_service', 'device_information']
      });
  
      console.log(`Found Device: ${device.name || 'Unknown'} (ID: ${device.id})`);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Start scanning
  scanBluetoothDevices();
  