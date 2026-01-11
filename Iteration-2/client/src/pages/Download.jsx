import React from "react";
import DownloadIcon from "../public/download.svg"; // use your new download SVG

function Download() {
  // Example handler for the button
  const handleReturnToStart = () => {
    alert("Returning to start page...");
    // Add your navigation logic if needed
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ width: "700px", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "#EAEAEA",
            border: "1px solid #9E9E9E",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={DownloadIcon}
            alt="Download Icon"
            style={{
              width: "120px",
              height: "150px",
              marginBottom: "20px",
            }}
          />
          <p style={{ fontSize: "14px", margin: 0 }}>
            Download Session Summary
          </p>
        </div>
        <button
          onClick={handleReturnToStart}
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
          Return to Start Page
        </button>
      </div>
    </div>
  );
}

export default Download;
