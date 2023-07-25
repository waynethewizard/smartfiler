import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css'; // make sure to import the css file


function App() {
  const [isActive, setIsActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'text/csv',
    maxFiles: 1,
    maxSize: 10485760, // 10MB
    onDropAccepted: async (acceptedFiles) => {
      setIsActive(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        fetch('http://localhost:8000', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/csv'
          },
          body: fileAsBinaryString
        })
        .then(response => response.json()) // expect a json response
        .then(json => {
          setUploadStatus('File uploaded successfully.');
          console.log('Received JSON:', json);
        })
        .catch(error => {
          console.log('An error occurred:', error);
          setUploadStatus(`An error occurred: ${error.message}`);
        })
        .finally(() => {
          setIsActive(false);
        });
      };
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.readAsBinaryString(file);
    },
    onDropRejected: () => {
      setIsActive(false);
      setUploadStatus('Invalid file. Please upload a CSV file less than 10MB.');
    },
  });

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