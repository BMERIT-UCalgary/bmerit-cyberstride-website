import { useState, useRef, useEffect } from "react";

export function useBluetooth() {
  const [isConnected, setIsConnected] = useState({});
  const [notificationValues, setNotificationValues] = useState({});
  const [allAsciiData, setAllAsciiData] = useState({}); // separate CSV buffers
  const [hasFinished, setHasFinished] = useState({});
  const connections = useRef({});

  useEffect(() => {
    console.log("All ascii data: ", JSON.stringify(allAsciiData))
  }, [allAsciiData])

  // Device config map (you can edit names and UUIDs here)
  const deviceConfigs = {
    device1: {
      name: "pressureOnly",
      serviceUUID: "3830cd31-c537-405b-863f-ee0bfb5fdfee",
      readCharUUID: "5693efbe-c8d8-4414-9565-064b32202ccc",
      writeCharUUID: "5693efbe-c8d8-4414-9565-064b32202aaa",
    },
    device2: {
      name: "pressureAndBuzzer",
      serviceUUID: "4830cd31-c537-405b-863f-ee0bfb5fdfee",
      readCharUUID: "4693efbe-c8d8-4414-9565-064b32202ccc",
      writeCharUUID: "4693efbe-c8d8-4414-9565-064b32202aaa",
    },
    device3: {
      name: "hallEffectAndIR",
      serviceUUID: "5830cd31-c537-405b-863f-ee0bfb5fdfee",
      readCharUUID: "5693efbe-c8d8-4414-9565-064b32202ccc",
      writeCharUUID: "5693efbe-c8d8-4414-9565-064b32202aaa",
    },
    device4: {
      name: "IRonly",
      serviceUUID: "4a94ea0f-aa89-420c-b15c-916affe1a78c",
      readCharUUID: "c52d2a92-89bd-4e13-a0b2-61726f6ffb9c",
      writeCharUUID: "4f166119-5ac8-412a-9a28-97d2d9ee408a",
    },
  };

  const handleAsciiData = (deviceKey) => (event) => {
    const value = event.target.value;
    const text = new TextDecoder("utf-8").decode(value).trim();

    console.log(`Received from ${deviceKey}:`, text);

    if (text === "EOF, EOF") {
      console.log(`${deviceKey} has finished sending data`);

      setHasFinished((prev) => ({ ...prev, [deviceKey]: true }));

      // Trigger next device in order
      if (deviceKey === "device2") sendCommand("device1", "READ");
      else if (deviceKey === "device1") sendReadCommandDevice3();
      else if (deviceKey === "device3") sendReadCommandDevice4();
      else console.log("All devices have completed data transfer.");

      return;
    }

    // Regular line of data
    setNotificationValues((prev) => ({ ...prev, [deviceKey]: text }));
    setAllAsciiData((prev) => ({
      ...prev,
      [deviceKey]: (prev[deviceKey] || "") + text + "\n",
    }));
  };


  const connectToDevice = async (deviceKey) => {
    try {
      const config = deviceConfigs[deviceKey];
      if (!config) throw new Error(`No config for ${deviceKey}`);

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: config.name }],
        optionalServices: [config.serviceUUID],
      });

      device.addEventListener("gattserverdisconnected", () => onDisconnected(deviceKey));

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(config.serviceUUID);

      const readChar = await service.getCharacteristic(config.readCharUUID);
      await readChar.startNotifications();
      readChar.addEventListener("characteristicvaluechanged", handleAsciiData(deviceKey));

      const writeChar = await service.getCharacteristic(config.writeCharUUID);

      connections.current[deviceKey] = { device, server, service, readChar, writeChar };
      setIsConnected((prev) => ({ ...prev, [deviceKey]: true }));
      console.log(`${deviceKey} connected and ready`);
    } catch (error) {
      console.error(`Failed to connect to ${deviceKey}:`, error);
    }
  };

  const disconnectDevice = (deviceKey) => {
    const info = connections.current[deviceKey];
    if (info && info.device.gatt.connected) {
      info.device.gatt.disconnect();
    }
  };

  const onDisconnected = (deviceKey) => {
    setIsConnected((prev) => ({ ...prev, [deviceKey]: false }));
    connections.current[deviceKey] = null;
    console.log(`${deviceKey} disconnected`);
  };

  const sendCommand = async (deviceKey, commandString) => {
    try {
      const writeChar = connections.current[deviceKey]?.writeChar;
      if (!writeChar) {
        console.error(`Write characteristic for ${deviceKey} not available`);
        return;
      }
      const encoder = new TextEncoder();
      await writeChar.writeValue(encoder.encode(commandString));
      console.log(`Sent '${commandString}' to ${deviceKey}`);
    } catch (error) {
      console.error(`Failed to send '${commandString}' to ${deviceKey}:`, error);
    }
  };

  const downloadAsciiData = () => {
    for (const [deviceKey, data] of Object.entries(allAsciiData)) {
      const blob = new Blob([data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${deviceKey}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return {
    isConnected,
    notificationValues,
    allAsciiData,
    hasFinished,
    connectToDevice1: () => connectToDevice("device1"),
    connectToDevice2: () => connectToDevice("device2"),
    connectToDevice3: () => connectToDevice("device3"),
    connectToDevice4: () => connectToDevice("device4"),
    disconnectDevice1: () => disconnectDevice("device1"),
    disconnectDevice2: () => disconnectDevice("device2"),
    disconnectDevice3: () => disconnectDevice("device3"),
    disconnectDevice4: () => disconnectDevice("device4"),
    sendReadCommandDevice1: () => sendCommand("device1", "READ"),
    sendReadCommandDevice2: () => sendCommand("device2", "READ"),
    sendReadCommandDevice3: () => sendCommand("device3", "READ"),
    sendReadCommandDevice4: () => sendCommand("device4", "READ"),
    sendWriteCommandDevice1: () => sendCommand("device1", "WRITE"),
    sendWriteCommandDevice2: () => sendCommand("device2", "WRITE"),
    sendWriteCommandDevice3: () => sendCommand("device3", "WRITE"),
    sendWriteCommandDevice4: () => sendCommand("device4", "WRITE"),
    downloadAsciiData,
    sendCommand
  };
}