// Dropzone.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onUpload, uploadStatus }) => {
  const [isActive, setIsActive] = useState(false);

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
        onUpload(fileAsBinaryString, file.name);  // Pass the file name to the callback
        setIsActive(false);
      };
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.readAsBinaryString(file);
    },
    onDropRejected: () => {
      setIsActive(false);
    },
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <p>{uploadStatus ? uploadStatus : 'Drop a CSV file here, or click to select a file'}</p>
    </div>
  );
}

export default Dropzone;
