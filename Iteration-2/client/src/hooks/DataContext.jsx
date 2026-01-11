import { createContext, useContext, useState, useEffect } from "react";
import * as Papa from "papaparse";

const CSVContext = createContext();

export function DataContext({ children }) {
    const [data, setData] = useState([]);
    const [allAsciiData, setAllAsciiData] = useState(""); // ✅ Your BLE CSV string

    // Load CSV once when the app starts
    const loadCSV = async () => {
        try {
            const response = await fetch("/data/yourfile.csv"); // Adjust path
            const text = await response.text();

            Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
                    setData(result.data);
                },
            });
        } catch (error) {
            console.error("Error loading CSV:", error);
        }
    };

    useEffect(() => {
        loadCSV();
    }, []);

    const updateCSVData = (newData) => {
        setData(newData);
    };

    return (
        <CSVContext.Provider
            value={{
                csvData: data,
                updateCSVData,
                allAsciiData,          // ✅ exposed for your BLE system
                setAllAsciiData        // ✅ to update from BLE data
            }}
        >
            {children}
        </CSVContext.Provider>
    );
}

// Custom Hook
export function useCSV() {
    return useContext(CSVContext);
}
