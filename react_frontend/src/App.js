// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import './App.css';
import Dropzone from './Dropzone';
import DataDisplay from './DataDisplay';
import ChatWindow from './ChatWindow';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm.js';


function App() {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [chatContent, setChatContent] = useState('Chat content will go here...');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    // You now have the user data. You can display the user's information, or provide personalized features based on the user data.
};

  const handleSignUp = (userData) => {
    // signUp logic here
  };


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
    <Router>
      <div className="App">
        <h1 className="logo">smartfiler</h1>
        <div>
          {/* Link to the login and sign up pages */}
          <Link to="/account/login">Login</Link>
          <Link to="/account/sign-up">Sign Up</Link>
        </div>
        <Routes>
          <Route path="/account/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/account/sign-up" element={<SignUpForm onSignUp={handleSignUp} />} />
          <Route path="/" element={
            <>
              <div className="content">
                <Dropzone onUpload={handleUpload} uploadStatus={uploadStatus} />
                <DataDisplay data={data} />
              </div>
              <ChatWindow chatContent={chatContent} />
              <footer className="footer">
                {/* Include your footer content here */}
              </footer>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
