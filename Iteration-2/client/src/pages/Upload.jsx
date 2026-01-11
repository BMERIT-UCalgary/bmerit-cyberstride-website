import React, { useState } from "react";
import CloudIcon from "../public/upload.svg";
import { useCSV } from "../hooks/DataContext";
import { useNavigate } from 'react-router-dom';


function Upload() {
  const [fileContent, setFileContent] = useState("");
  const { csvData, updateCSVData } = useCSV();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateCSVData(file);
      readCSV(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      updateCSVData(file);
      readCSV(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const readCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
      console.log('CSV Content:', e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ width: '85dvw', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '300px',
            backgroundColor: '#EAEAEA',
            border: '1px solid #9E9E9E',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            src={CloudIcon}
            alt="Cloud Icon"
            style={{
              width: '120px',
              height: '150px',
              marginBottom: '20px',
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>
            Drag and Drop CSV or{' '}
            <label
              style={{
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              browse
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </p>
          {csvData && (
            <p style={{ marginTop: "10px", color: "#007bff", fontWeight: "bold" }}>
              {csvData.name}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (csvData.length != 0) {
              console.log("CSV ", csvData);
              navigate('/dashboard')
            }
            else {
              alert('No CSV file selected!');
            }
          }}
          style={{
            position: "absolute",
            bottom: "-50px",
            right: 0,
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: "8%",
            cursor: "pointer",
            border: "none",
            outline: "none",
            fontWeight: "normal",
          }}
        >
          Load Data
        </button>
      </div>
      {fileContent && (
        <div
          style={{
            marginTop: '100px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            width: '600px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h4>CSV Preview:</h4>
          <pre
            style={{
              maxHeight: '200px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {fileContent.substring(0, 500)}...
          </pre>
        </div>
      )}
    </div>
  );
}

export default Upload;
