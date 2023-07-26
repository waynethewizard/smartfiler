// App.js
import React, { useState } from 'react';
import './App.css';
import Dropzone from './Dropzone';
import DataDisplay from './DataDisplay';
import ChatWindow from './ChatWindow';

function App() {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [chatContent, setChatContent] = useState('Chat content will go here...');

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
    

  return (
    <div className="App">
      <h1 className="logo">Smartfiler</h1>
      <div className="content">
        <Dropzone onUpload={handleUpload} uploadStatus={uploadStatus} />
        <DataDisplay data={data} />
      </div>
      <ChatWindow chatContent={chatContent} />
      <footer className="footer">
        {/* Include your footer content here */}
      </footer>
    </div>
  );
}

export default App;
