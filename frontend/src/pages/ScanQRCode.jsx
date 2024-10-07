import React, { useState, useEffect } from "react";
import "../assets/ScanQRCode.css";
import QrReader from "react-qr-scanner";
import QrScanner from "qr-scanner";
import httpClient1 from "../utils/component";

function ScanQRCode() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [qrResult, setQrResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      readQrCodeFromFile(file);
    }
  };

  const handleEnableCamera = () => {
    setIsCameraEnabled(true);
  };

  const handleDisableCamera = () => {
    setIsCameraEnabled(false);
  };

  const handleScan = (data) => {
    console.log("hii");
    if (data) {
      setQrResult(data.text);
      onGenerateHandler(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const onGenerateHandler = (data) => {
    httpClient1
      .put("/", JSON.parse(data))
      .then((response) => {
        // Handle successful response here
        console.log("response.data?.accessToken", response.data.data);
        if (response.data.data) console.log("edit don");
        // setSuccessMessage(true);
        // Example: navigate to dashboard or set user state
      })
      .catch((error) => {
        // Handle error
        console.error("Items not available:", error);
        // Example: display error message to user
      });
  };

  const readQrCodeFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      QrScanner.scanImage(e.target.result, { returnDetailedScanResult: true })
        .then((result) => {
          console.log("result.data>>", result.data);
          onGenerateHandler(result.data);
        })
        .catch((error) => console.error(error));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="scan-qr-container">
      <div className="upload-qr">
        <h2>Upload QR Code</h2>
        <input type="file" onChange={handleFileSelect} />
        {selectedFile && <p>File selected: {selectedFile.name}</p>}
        <button>Upload</button>
      </div>
      <div className="scan-qr">
        <h2>Scan QR Code</h2>
        {isCameraEnabled ? (
          <>
            <QrReader
              delay={300}
              className="qr-player"
              onError={handleError}
              onScan={handleScan}
            />
            <button onClick={handleDisableCamera}>Disable Webcam</button>
          </>
        ) : (
          <button onClick={handleEnableCamera}>Enable Webcam</button>
        )}
        {qrResult && <p>Scanned QR Code: {qrResult}</p>}
      </div>
    </div>
  );
}

export default ScanQRCode;
