// App.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css'; // make sure to import the css file


function App() {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = (fileAsBinaryString, fileName) => {
    // Upload the file and get the data
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv'
      },
      body: fileAsBinaryString
    })
    .then(response => response.json()) // expect a json response
    .then(json => {
      setUploadStatus(`File uploaded successfully: ${fileName}`);  // Include the file name in the status
      console.log('Received JSON:', json);
      setData(json);  // save the json data to the state
    })
    .catch(error => {
      console.log('An error occurred:', error);
      setUploadStatus(`An error occurred: ${error.message}`);
    })
    .finally(() => {
      setIsActive(false);
    });
  }
    

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(false)
  }

  return (
    <div className="App">
      <h1 className="logo">Smartfiler</h1>
      <div {...getRootProps()} className={`dropzone ${isActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drop a CSV file here, or click to select a file</p>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
      <div className="data-display">
        {/* Here you can render your data */}
      </div>
      <footer className="footer">
        {/* Include your footer content here */}
      </footer>
    </div>
  );
}

export default App;